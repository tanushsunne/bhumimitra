import { DegradationCardData } from '../types';

export const degradationCards: DegradationCardData[] = [
  {
    id: "water_wind_erosion",
    title: "Water & Wind Soil Erosion",
    tag: "Most Widespread in India",
    cause: "Unprotected sloping fields lose fertile topsoil when heavy monsoon rains wash soil downhill, or dry seasonal winds blow dry loose silt away.",
    effect: "Washes away organic-rich top 15 cm of soil, creates deep gullies, silts up farm ponds, and drastically reduces water-holding capacity.",
    indicator: "Rills, deep rain cuts in fields, exposed plant roots, and muddy runoff water during rains.",
    affectedRegions: "Foothills of Himalayas, Central India plateau, Chambal ravines, and arid western Rajasthan.",
    sourceNotice: "Source: ICAR-NBSS&LUP Land Degradation Atlas — verify before presenting",
    iconName: "Waves"
  },
  {
    id: "salinity_sodicity",
    title: "Salinity & Sodicity (Salt Stress)",
    tag: "Canal & Coastal Belts",
    cause: "Excessive flood irrigation with poor underground drainage draws deep dissolved mineral salts up to the root zone via capillary action.",
    effect: "White salt crust stunts crop germination, blocks root moisture uptake (osmotic stress), and causes sodium toxicity in cash crops.",
    indicator: "White powdery salt patches on dry soil surface, leaf tip burning, and soil that turns slippery like soap when wet.",
    affectedRegions: "Canal-irrigated belts of Punjab, Haryana, Western UP, and Saurashtra / coastal Gujarat.",
    sourceNotice: "Source: Central Soil Salinity Research Institute (CSSRI) — verify before presenting",
    iconName: "Sparkles"
  },
  {
    id: "waterlogging_drainage",
    title: "Waterlogging & Subsurface Compaction",
    tag: "Drainage Congestion",
    cause: "Inadequate surface outlets, excessive canal seepage, and continuous heavy tractor tillage creating an impermeable hardpan beneath.",
    effect: "Suffocates crop roots (hypoxia), leads to toxic iron/manganese buildup, prevents nitrogen fixation, and rots seedlings.",
    indicator: "Standing muddy puddles for days after rain, foul swampy odor, yellowing lower leaves, and stunted seedling growth.",
    affectedRegions: "Indo-Gangetic plains, command areas of major irrigation barrages, and coastal floodplains.",
    sourceNotice: "Source: ICAR Report on Waterlogging in Command Areas — verify before presenting",
    iconName: "Droplets"
  },
  {
    id: "soil_acidification",
    title: "Soil Acidification (Low pH < 5.5)",
    tag: "High Rainfall & Acid Soils",
    cause: "Heavy monsoon rains leaching basic calcium and magnesium ions down deep, combined with prolonged unbalanced urea/nitrogenous fertilizer use.",
    effect: "Fixes phosphorus into insoluble forms (unavailable to plants), causes aluminum and manganese toxicity, and suppresses soil bacterial activity.",
    indicator: "Poor crop response to DAP/SSP, weak root branching, purple discoloration in maize/cereal leaves, and slow organic decay.",
    affectedRegions: "Northeastern states, Kerala, coastal Karnataka, and parts of Odisha and Jharkhand.",
    sourceNotice: "Source: ICAR Acid Soil Management Advisory — verify before presenting",
    iconName: "FlaskConical"
  },
  {
    id: "organic_matter_depletion",
    title: "Loss of Organic Carbon & Biological Life",
    tag: "Critical National Challenge",
    cause: "Burning crop residue (stubble), total removal of straw, monoculture cropping, and absence of farmyard manure or green manure crops.",
    effect: "Soil Organic Carbon drops below 0.5% (healthy soils require >0.75%), destroying crumb structure, microbial flora, and natural fertilizer efficiency.",
    indicator: "Soil turns hard like concrete when dry, low earthworm counts, poor moisture retention during brief dry spells.",
    affectedRegions: "Intensive cereal-cereal cropping belts across North, Central, and Peninsular India.",
    sourceNotice: "Source: National Soil Health Card Scheme Data — verify before presenting",
    iconName: "Sprout"
  }
];
