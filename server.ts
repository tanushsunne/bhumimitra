import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const PORT = 3000;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Fallback rule-based agronomic diagnosis if API key is not set or network fails
function generateFallbackDiagnosis(answers: any, lang: string = "en") {
  const signs = Array.isArray(answers.visibleSigns) ? answers.visibleSigns : [];
  const color = answers.soilColor || "";
  const texture = answers.texture || "";
  const water = answers.waterBehavior || "";
  const yieldTrend = answers.cropYieldTrend || "";

  let score = 65;
  const degradationList: Array<{ type: string; confidence: string; reason: string }> = [];
  const observations: string[] = [];
  const actions: Array<{ priority: number; action: string; practice_name: string; description: string; timeline: string }> = [];
  const crops: string[] = [];

  // Salinity
  if (color.includes("white") || signs.some((s: string) => s.toLowerCase().includes("salt"))) {
    score -= 22;
    degradationList.push({
      type: "Salinity and Alkalinity (Sodicity)",
      confidence: "High",
      reason: "White surface encrustation indicates accumulated soluble salts or sodium carbonates."
    });
    actions.push({
      priority: 1,
      action: "Apply Agricultural Gypsum & Flush with Fresh Water",
      practice_name: "Gypsum Application",
      description: "Broadcast gypsum (2–3 tons/ha) before monsoon and provide leaching drainage to replace excess sodium ions.",
      timeline: "Pre-monsoon (May–June)"
    });
    crops.push("Barley", "Mustard", "Dhaincha (Sesbania)", "Salt-tolerant Rice (CSR-30)");
  }

  // Erosion
  if (signs.some((s: string) => s.toLowerCase().includes("gullies") || s.toLowerCase().includes("erosion"))) {
    score -= 18;
    degradationList.push({
      type: "Water & Rill Soil Erosion",
      confidence: "High",
      reason: "Active channels and topsoil wash-away under surface runoff during heavy rain showers."
    });
    actions.push({
      priority: 2,
      action: "Establish Contour Bunds and Vetiver Grass Strips",
      practice_name: "Contour Bunding & Vegetative Barriers",
      description: "Construct earthern bunds along slope contours and plant deep-rooted Vetiver grass to arrest silt run-off.",
      timeline: "Immediately before rainy season"
    });
  }

  // Waterlogging
  if (water.includes("waterlogged") || water.includes("slowly")) {
    score -= 15;
    degradationList.push({
      type: "Waterlogging & Subsurface Compaction",
      confidence: "Medium",
      reason: "Slow infiltration and standing water create anaerobic root stress and denitrification."
    });
    actions.push({
      priority: 3,
      action: "Create Broad Bed Furrows & Subsoiling Drainage",
      practice_name: "Broad Bed & Furrow (BBF) Drainage",
      description: "Form raised beds with intermediate drainage channels to evacuate excess storm water while retaining moisture.",
      timeline: "Field preparation"
    });
    crops.push("Paddy (Rice)", "Water Chestnut", "Jute");
  }

  // Loss of organic matter
  if (yieldTrend === "decreasing" || signs.some((s: string) => s.toLowerCase().includes("earthworms") || s.toLowerCase().includes("compact"))) {
    score -= 15;
    degradationList.push({
      type: "Severe Depletion of Soil Organic Carbon & Soil Biology",
      confidence: "High",
      reason: "Declining yields, compaction, and absence of earthworms reflect depleted microbial biomass and organic carbon (<0.5%)."
    });
    actions.push({
      priority: 1,
      action: "Incorporate Farm Yard Manure (FYM) and Green Manure",
      practice_name: "Green Manuring & Vermicompost",
      description: "Grow Dhaincha or Sunhemp and plough in situ at 45 days. Add 4–5 tonnes/acre well-decomposed vermicompost.",
      timeline: "Seasonal break / Pre-sowing"
    });
    crops.push("Green Gram (Moong)", "Chickpea", "Cowpea", "Millets (Bajra/Jowar)");
  }

  if (degradationList.length === 0) {
    degradationList.push({
      type: "Moderate Nutrient Exhaustion",
      confidence: "Medium",
      reason: "Continuous intensive cropping without balanced micronutrient replenishment."
    });
  }

  if (actions.length === 0) {
    actions.push({
      priority: 1,
      action: "Mulching and Crop Residue Retention",
      practice_name: "In-situ Mulching",
      description: "Leave straw and crop residue on field to buffer soil temperature and prevent moisture evaporation.",
      timeline: "Post-harvest"
    });
  }

  if (crops.length === 0) {
    crops.push("Sorghum (Jowar)", "Pigeon Pea (Arhar)", "Groundnut", "Mustard");
  }

  score = Math.max(18, Math.min(92, score));
  const level = score >= 70 ? "Good" : score >= 45 ? "Moderate" : "Poor";

  observations.push(`Soil color indicated as ${color || 'standard brown'} with ${texture || 'loamy'} texture.`);
  observations.push(`Drainage dynamics: ${water || 'moderate drainage'} with ${yieldTrend || 'stable'} yield trend.`);
  if (signs.length > 0) {
    observations.push(`Visual symptoms reported: ${signs.join(', ')}.`);
  }

  return {
    fertility_score: score,
    fertility_level: level,
    likely_degradation_types: degradationList,
    key_observations: observations,
    recommended_conservation_actions: actions.sort((a, b) => a.priority - b.priority),
    suggested_crops: Array.from(new Set(crops)),
    lab_test_recommended: true,
    summary_notes: "Based on field indicators, physical degradation and biological depletion require immediate conservation interventions and confirmatory laboratory Soil Health testing.",
    is_simulated_ai: true
  };
}

async function startServer() {
  const app = express();

  app.use(express.json({ limit: "25mb" }));
  app.use(express.urlencoded({ extended: true, limit: "25mb" }));

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "BhumiMitra" });
  });

  app.post("/api/analyze-soil", async (req, res) => {
    try {
      const { image, answers, language = "en" } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        console.log("No GEMINI_API_KEY configured, utilizing agronomic rule engine fallback");
        const fallback = generateFallbackDiagnosis(answers || {}, language);
        return res.json({
          success: true,
          data: fallback,
          source: "agronomic_engine"
        });
      }

      const promptText = `
You are a senior soil scientist and agronomist at an Indian Agricultural Research Institute (ICAR/KVK).
Analyze this farmer's field soil.
Farmer's Reported Indicators:
- Soil Color: ${answers?.soilColor || "Not specified"}
- Texture Feel: ${answers?.texture || "Not specified"}
- Water Behavior: ${answers?.waterBehavior || "Not specified"}
- Crop Yield Trend: ${answers?.cropYieldTrend || "Not specified"}
- Visible Symptoms / Signs: ${(answers?.visibleSigns || []).join(", ") || "None mentioned"}
- Crop Cultivated: ${answers?.cropGrown || "General Indian crops"}
- Location (State/District): ${answers?.location || "India"}
- Known pH / EC (if any): ${answers?.phEc || "Not tested yet"}
- Target Language: ${language} (Provide user-friendly text appropriate for an Indian farmer)

Provide a detailed, practical diagnosis in JSON format strictly adhering to this schema:
{
  "fertility_score": number (0 to 100, where 0-40 is Poor/Degraded, 41-70 is Moderate, 71-100 is Good),
  "fertility_level": "Poor" | "Moderate" | "Good",
  "likely_degradation_types": [
    {
      "type": string (e.g., "Water Erosion", "Salinity / Sodicity", "Loss of Organic Carbon", "Waterlogging / Compaction", "Acidification"),
      "confidence": "High" | "Medium" | "Low",
      "reason": string (short plain-language cause)
    }
  ],
  "key_observations": [string],
  "recommended_conservation_actions": [
    {
      "priority": number (1 being highest priority),
      "action": string (concise name),
      "practice_name": string (standard conservation technique, e.g. "Contour Bunding", "Gypsum Application", "Green Manuring"),
      "description": string (plain language practical instructions for farmer),
      "timeline": string (e.g. "Pre-monsoon", "Immediate", "Post-harvest")
    }
  ],
  "suggested_crops": [string (3 to 5 resilient crops suitable for this condition)],
  "lab_test_recommended": boolean,
  "summary_notes": string (encouraging, realistic summary advice for the farmer)
}
Return ONLY valid JSON.
`;

      const contentsParts: any[] = [];
      if (image && typeof image === "string" && image.includes("base64,")) {
        const [meta, base64Data] = image.split("base64,");
        const mimeMatch = meta.match(/data:([^;]+);/);
        const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
        contentsParts.push({
          inlineData: {
            mimeType,
            data: base64Data,
          },
        });
      }

      contentsParts.push({ text: promptText });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: { parts: contentsParts },
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are BhumiMitra, an expert Indian agricultural and soil health diagnostic AI. Return structured valid JSON diagnostic reports to help farmers protect and restore soil."
        },
      });

      const responseText = response.text || "{}";
      let parsedData;
      try {
        parsedData = JSON.parse(responseText.trim());
      } catch (e) {
        // In case of markdown formatting or minor syntax, clean and retry
        const clean = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
        parsedData = JSON.parse(clean);
      }

      return res.json({
        success: true,
        data: parsedData,
        source: "gemini_model"
      });

    } catch (err: any) {
      console.error("Gemini diagnosis error:", err?.message || err);
      // Fall back seamlessly to rule engine so presentation never breaks
      const fallback = generateFallbackDiagnosis(req.body?.answers || {}, req.body?.language || "en");
      return res.json({
        success: true,
        data: fallback,
        source: "fallback_recovery",
        notice: "Report generated via agronomic indicator model"
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`BhumiMitra server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
