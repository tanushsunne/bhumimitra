export interface PresetSoil {
  id: string;
  name: string;
  subtitle: string;
  imageDataUri: string;
  suggestedAnswers: {
    soilColor: string;
    texture: string;
    waterBehavior: string;
    cropYieldTrend: string;
    visibleSigns: string[];
    cropGrown: string;
    location: string;
    phEc: string;
  };
}

// Generate realistic SVG image representations of Indian field soil types
function generateSoilSvg(bgGradient: string, textureDotsColor: string, surfaceCrustColor?: string, crackLines?: boolean): string {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      ${bgGradient}
    </linearGradient>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" result="noise"/>
      <feColorMatrix type="matrix" values="0.33 0 0 0 0  0 0.33 0 0 0  0 0 0.33 0 0  0 0 0 0.15 0"/>
      <feComposite in2="SourceGraphic" in="gl" operator="in"/>
    </filter>
  </defs>
  <rect width="480" height="320" fill="url(#g)"/>
  
  <!-- Soil aggregate speckles & pebbles -->
  <g fill="${textureDotsColor}" opacity="0.6">
    <circle cx="45" cy="80" r="3.5"/>
    <circle cx="95" cy="40" r="5"/>
    <circle cx="150" cy="110" r="2.8"/>
    <circle cx="210" cy="65" r="4.2"/>
    <circle cx="270" cy="130" r="6"/>
    <circle cx="340" cy="75" r="3.2"/>
    <circle cx="410" cy="50" r="4.8"/>
    <circle cx="60" cy="200" r="5.5"/>
    <circle cx="125" cy="240" r="3"/>
    <circle cx="190" cy="180" r="4"/>
    <circle cx="260" cy="260" r="6.2"/>
    <circle cx="330" cy="210" r="3.8"/>
    <circle cx="395" cy="270" r="5.1"/>
    <circle cx="440" cy="190" r="4.5"/>
    <circle cx="80" cy="140" r="2"/>
    <circle cx="170" cy="285" r="3"/>
    <circle cx="310" cy="290" r="4"/>
    <circle cx="230" cy="160" r="2.5"/>
  </g>

  ${crackLines ? `
  <!-- Deep shrinkage fissures & cracks typical of vertisols -->
  <g stroke="#1a140e" stroke-width="2.8" fill="none" opacity="0.75" stroke-linecap="round">
    <path d="M50,30 Q90,90 140,120 T210,180 T230,280"/>
    <path d="M140,120 Q190,110 260,130 T350,150 T430,220"/>
    <path d="M260,130 Q280,70 310,40 T380,20"/>
    <path d="M210,180 Q160,210 110,240 T70,300"/>
    <path d="M350,150 Q380,210 400,290"/>
    <path d="M20,160 Q80,180 120,200"/>
  </g>
  ` : ''}

  ${surfaceCrustColor ? `
  <!-- White Saline/Alkaline mineral salt crust patches -->
  <g fill="${surfaceCrustColor}" opacity="0.82">
    <ellipse cx="140" cy="90" rx="45" ry="24" transform="rotate(-15, 140, 90)"/>
    <ellipse cx="290" cy="150" rx="65" ry="32" transform="rotate(8, 290, 150)"/>
    <ellipse cx="390" cy="85" rx="35" ry="18"/>
    <ellipse cx="90" cy="220" rx="50" ry="25" transform="rotate(12, 90, 220)"/>
    <ellipse cx="230" cy="240" rx="40" ry="22"/>
    <ellipse cx="370" cy="235" rx="55" ry="26" transform="rotate(-10, 370, 235)"/>
  </g>
  ` : ''}
  
  <!-- Subtle natural texture overlay -->
  <rect width="480" height="320" fill="#000" opacity="0.04"/>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}

export const presetSoils: PresetSoil[] = [
  {
    id: "black_cotton",
    name: "Black Cotton Soil (Vertisol)",
    subtitle: "Maharashtra / MP / Gujarat – Deep cracking clay",
    imageDataUri: generateSoilSvg(
      '<stop offset="0%" stop-color="#2c221a"/><stop offset="50%" stop-color="#241b14"/><stop offset="100%" stop-color="#18120d"/>',
      '#4a3b2c',
      undefined,
      true
    ),
    suggestedAnswers: {
      soilColor: "Dark Brown / Black (Rich in humus or Black Cotton)",
      texture: "Sticky & Clayey (Hard when dry, plastic when wet)",
      waterBehavior: "Develops deep fissures / Cracks when dry",
      cropYieldTrend: "Stable / Average yields",
      visibleSigns: ["Hard compact plow layer / Stunted roots"],
      cropGrown: "Cotton & Soybean",
      location: "Maharashtra, Amravati",
      phEc: "pH 7.8, Normal EC"
    }
  },
  {
    id: "saline_sodic",
    name: "Saline Soil with Salt Crust",
    subtitle: "Punjab / Haryana / Gujarat – Evaporative salt encrustation",
    imageDataUri: generateSoilSvg(
      '<stop offset="0%" stop-color="#a38f78"/><stop offset="50%" stop-color="#8c7860"/><stop offset="100%" stop-color="#6e5c46"/>',
      '#5c4a35',
      '#fbfaf5',
      false
    ),
    suggestedAnswers: {
      soilColor: "White Crust on Surface (Saline / Sodic Salt deposit)",
      texture: "Sticky & Clayey (Hard when dry, plastic when wet)",
      waterBehavior: "Drains slowly / Heavy water percolation",
      cropYieldTrend: "Decreasing despite fertilizers",
      visibleSigns: ["White Salt Patches on surface", "Few or no earthworms in soil"],
      cropGrown: "Wheat & Mustard",
      location: "Punjab, Bathinda",
      phEc: "pH 8.6, EC 3.4 dS/m (High)"
    }
  },
  {
    id: "red_laterite",
    name: "Red Lateritic Loam (Alfisol)",
    subtitle: "Karnataka / Odisha / Telangana – Leached iron-rich soil",
    imageDataUri: generateSoilSvg(
      '<stop offset="0%" stop-color="#99442b"/><stop offset="50%" stop-color="#803520"/><stop offset="100%" stop-color="#6b2713"/>',
      '#4d1a0c',
      undefined,
      false
    ),
    suggestedAnswers: {
      soilColor: "Red / Reddish Brown (Laterite / Red Loam)",
      texture: "Smooth & Loamy (Spongy, holds shape softly)",
      waterBehavior: "Drains very fast / Dries out within hours",
      cropYieldTrend: "Stable / Average yields",
      visibleSigns: ["Gullies / Rills / Rain Washout"],
      cropGrown: "Groundnut & Red Gram (Arhar)",
      location: "Karnataka, Tumkur",
      phEc: "pH 5.8 (Mildly Acidic)"
    }
  },
  {
    id: "eroded_sandy",
    name: "Severely Eroded Sandy Loam",
    subtitle: "Rajasthan / Bundelkhand – Low organic matter & runoff",
    imageDataUri: generateSoilSvg(
      '<stop offset="0%" stop-color="#baa48b"/><stop offset="50%" stop-color="#a68e74"/><stop offset="100%" stop-color="#8f775c"/>',
      '#5c4b37',
      undefined,
      false
    ),
    suggestedAnswers: {
      soilColor: "Light Pale / Grey (Sandy / Leached / Nutrient Poor)",
      texture: "Gritty & Sandy (Falls apart quickly, coarse)",
      waterBehavior: "Drains very fast / Dries out within hours",
      cropYieldTrend: "Decreasing despite fertilizers",
      visibleSigns: ["Gullies / Rills / Rain Washout", "Few or no earthworms in soil", "Heavy weed infestation / Bare patches"],
      cropGrown: "Pearl Millet (Bajra)",
      location: "Rajasthan, Nagaur",
      phEc: "pH 7.4"
    }
  }
];
