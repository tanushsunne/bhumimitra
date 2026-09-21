import { ConservationPractice } from '../types';

export const conservationPractices: ConservationPractice[] = [
  {
    id: "contour_bunding",
    name: "Contour Bunding",
    category: "erosion",
    categoryLabel: "Soil Erosion",
    description: "Constructing small earthen ridges or stone bunds across the natural slope along contour lines to impede runoff velocity and trap dislodged silt.",
    benefits: [
      "Reduces topsoil erosion by 60–80%",
      "Increases soil moisture infiltration in rainfed fields",
      "Creates micro-catchments that recharge local groundwater"
    ],
    bestFor: "Gently sloping rainfed farmland (1–6% slope) in red and black soil regions",
    implementationCost: "Low",
    effort: "Moderate"
  },
  {
    id: "terracing",
    name: "Bench Terracing",
    category: "erosion",
    categoryLabel: "Soil Erosion",
    description: "Transforming steep hillsides into a stepped staircase of flat cultivable benches supported by riser walls of grass or stones.",
    benefits: [
      "Prevents landslide risks and deep gully canyon formation",
      "Enables productive terraced crop cultivation on hilly tracts",
      "Arrests torrential hillside rain velocity"
    ],
    bestFor: "Steep hill slopes (greater than 15% slope) in Himalayan and Western Ghats regions",
    implementationCost: "High",
    effort: "Technical"
  },
  {
    id: "mulching",
    name: "Organic In-situ Mulching",
    category: "fertility",
    categoryLabel: "Low Organic Matter",
    description: "Spreading a 5–10 cm protective blanket of straw, dry grass, dried leaves, or sugarcane trash across the soil surface around standing crops.",
    benefits: [
      "Cuts soil moisture evaporation by up to 40%",
      "Buffers root temperatures during intense Indian summer heatwaves",
      "Decomposes into rich organic humus that feeds earthworms and microbes"
    ],
    bestFor: "Horticulture orchards, vegetables, cotton, sugarcane, and dryland grain crops",
    implementationCost: "Low",
    effort: "Simple"
  },
  {
    id: "cover_crops",
    name: "Cover Cropping",
    category: "erosion",
    categoryLabel: "Soil Erosion",
    description: "Sowing fast-growing, dense-canopy crops (like Cowpea, Horse Gram, or Velvet Bean) between main crop rows or during fallow seasons.",
    benefits: [
      "Shields topsoil from raindrop kinetic impact during pre-monsoon storms",
      "Suppresses weed germination by smothering sunlight",
      "Binds loose soil particles with fibrous root systems"
    ],
    bestFor: "Orchards, fallow kharif-rabi transition periods, and erosion-prone sandy soils",
    implementationCost: "Low",
    effort: "Simple"
  },
  {
    id: "green_manure",
    name: "Green Manuring (Dhaincha / Sunhemp)",
    category: "fertility",
    categoryLabel: "Low Organic Matter",
    description: "Growing leguminous crops like Sesbania aculeata (Dhaincha) or Crotalaria juncea (Sunhemp) for 45–50 days and ploughing them into wet soil just before flowering.",
    benefits: [
      "Adds 15–20 tonnes of fresh biomass per hectare into the soil profile",
      "Fixes 60–90 kg of atmospheric biological nitrogen naturally",
      "Improves soil crumb structure, aeration, and microbial activity"
    ],
    bestFor: "Paddy (Rice) fields, sugarcane rotations, and soils depleted of organic carbon",
    implementationCost: "Low",
    effort: "Simple"
  },
  {
    id: "crop_rotation",
    name: "Legume-Inclusive Crop Rotation",
    category: "fertility",
    categoryLabel: "Low Organic Matter",
    description: "Alternating heavy nutrient-consuming crops (like Wheat, Paddy, or Maize) with deep-rooted nitrogen-fixing pulses (Chickpea, Moong, Pigeon Pea).",
    benefits: [
      "Breaks pest, nematode, and weed reproduction lifecycles",
      "Balances root nutrient uptake from alternating soil depths",
      "Restores residual root nitrogen for the following seasonal crop"
    ],
    bestFor: "All multi-cropped arable agricultural fields",
    implementationCost: "Low",
    effort: "Simple"
  },
  {
    id: "agroforestry",
    name: "Agroforestry & Bund Trees",
    category: "erosion",
    categoryLabel: "Soil Erosion",
    description: "Integrating perennial multipurpose trees (like Subabul, Neem, Khejri, Drumstick, or Gliricidia) along field boundaries and windbreak alleys.",
    benefits: [
      "Deep taproots pump subsoil nutrients to the surface via leaf litterfall",
      "Serves as windbreaks to halt soil desiccation and wind erosion",
      "Generates supplementary farmer income through timber, fodder, and fruit"
    ],
    bestFor: "Arid and semi-arid drylands, farm perimeters, and degraded watershed slopes",
    implementationCost: "Medium",
    effort: "Moderate"
  },
  {
    id: "gypsum_application",
    name: "Agricultural Gypsum for Sodic Soils",
    category: "salinity",
    categoryLabel: "Salinity & Sodicity",
    description: "Broadcasting calculated amounts of mineral gypsum (Calcium Sulphate) on alkali/sodic soils followed by heavy leaching irrigation with fresh canal water.",
    benefits: [
      "Calcium displaces toxic exchangeable sodium (Na+) bound to clay particles",
      "Restores soil aggregation, water infiltration, and flocculation",
      "Neutralizes soil pH down from hazardous levels (>8.5) to healthy neutral range"
    ],
    bestFor: "Alkali/sodic soils with white-grey crust and poor water percolation (Usar soils)",
    implementationCost: "Medium",
    effort: "Moderate"
  },
  {
    id: "vermicompost",
    name: "Vermicomposting & Bio-Enrichment",
    category: "fertility",
    categoryLabel: "Low Organic Matter",
    description: "Recycling cow dung and farm crop waste using Eisenia fetida earthworms to produce dark, odor-free, nutrient-dense organic manure.",
    benefits: [
      "Rich in beneficial plant growth hormones (auxins), actinomycetes, and enzymes",
      "Enhances soil cation exchange capacity (CEC) and micronutrient availability",
      "Improves moisture retention by up to 30% in coarse sandy soils"
    ],
    bestFor: "All soil types, particularly organic farming and degraded infertile lands",
    implementationCost: "Low",
    effort: "Simple"
  },
  {
    id: "zero_tillage",
    name: "Zero / Conservation Tillage",
    category: "erosion",
    categoryLabel: "Soil Erosion",
    description: "Direct-drilling seeds and fertilizer straight into undisturbed previous crop stubble using specialized Happy Seeders or zero-till drills.",
    benefits: [
      "Saves Rs. 2,500–3,500 per acre in diesel and tractor preparation costs",
      "Leaves root channels intact, drastically lowering wind and water erosion",
      "Prevents soil compaction and preserves delicate fungal mycorrhizal networks"
    ],
    bestFor: "Wheat after Paddy harvest (eliminates stubble burning need), maize, and mustard",
    implementationCost: "Medium",
    effort: "Moderate"
  },
  {
    id: "drip_irrigation",
    name: "Precision Drip Irrigation & Fertigation",
    category: "waterlogging",
    categoryLabel: "Waterlogging",
    description: "Delivering filtered water and soluble nutrients directly to plant root zones at slow, controlled rates through plastic emitter tubes.",
    benefits: [
      "Saves 40–60% irrigation water compared to conventional flood irrigation",
      "Eliminates waterlogging risks, canal seepage, and secondary soil salinization",
      "Prevents leaching of costly fertilizers into deep groundwater tables"
    ],
    bestFor: "Row crops, cotton, sugarcane, horticulture, bananas, and water-stressed zones",
    implementationCost: "High",
    effort: "Technical"
  },
  {
    id: "vegetative_barriers",
    name: "Vegetative Barriers (Vetiver Grass Strips)",
    category: "erosion",
    categoryLabel: "Soil Erosion",
    description: "Planting dense, parallel hedgerows of deep-rooted, non-invasive Vetiver grass (Khus) along field contours to filter runoff and hold terrace banks.",
    benefits: [
      "Vetiver's massive 3–4 meter root network creates an underground biological curtain",
      "Spreads flash flood water smoothly across fields without carving gullies",
      "Tolerates drought, waterlogging, high salinity, and heavy metal toxicity"
    ],
    bestFor: "Farm borders, gully heads, embankment edges, and roadside slopes",
    implementationCost: "Low",
    effort: "Simple"
  }
];
