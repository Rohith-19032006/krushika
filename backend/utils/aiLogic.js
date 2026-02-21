/**
 * Rule-based AI logic for soil analysis, crop recommendation, and weather placeholder.
 * Weather uses external API in controller.
 */

const SOIL_TYPES = ['clay', 'sandy', 'loamy', 'silt', 'peat'];
const CROPS = [
  { name: 'Wheat', soil: ['loamy', 'clay'], pH: [6, 7.5], N: 'medium', P: 'medium', K: 'low' },
  { name: 'Rice', soil: ['clay', 'silt'], pH: [5, 6.5], N: 'high', P: 'medium', K: 'medium' },
  { name: 'Maize', soil: ['loamy', 'sandy'], pH: [5.5, 7], N: 'high', P: 'medium', K: 'medium' },
  { name: 'Cotton', soil: ['loamy', 'clay'], pH: [5.5, 8], N: 'medium', P: 'high', K: 'medium' },
  { name: 'Sugarcane', soil: ['loamy', 'clay'], pH: [6, 7.5], N: 'high', P: 'medium', K: 'high' },
  { name: 'Groundnut', soil: ['sandy', 'loamy'], pH: [5.5, 7], N: 'low', P: 'medium', K: 'low' },
  { name: 'Pulses (Dal)', soil: ['loamy', 'sandy'], pH: [6, 7.5], N: 'low', P: 'medium', K: 'low' },
  { name: 'Barley', soil: ['loamy', 'sandy'], pH: [6, 8], N: 'medium', P: 'medium', K: 'low' },
  { name: 'Mustard', soil: ['loamy', 'clay'], pH: [6, 7.5], N: 'medium', P: 'high', K: 'medium' },
  { name: 'Soybean', soil: ['loamy', 'clay'], pH: [6, 7], N: 'medium', P: 'high', K: 'medium' },
];

function getNutrientLevel(value) {
  if (value < 30) return 'low';
  if (value < 70) return 'medium';
  return 'high';
}

function pHInRange(pH, range) {
  return pH >= range[0] && pH <= range[1];
}

export function getSuitableCropsFromSoil(soilType, pH, N, P, K) {
  const nLevel = getNutrientLevel(N);
  const pLevel = getNutrientLevel(P);
  const kLevel = getNutrientLevel(K);
  const normalizedSoil = soilType?.toLowerCase() || 'loamy';

  const suitable = CROPS.filter((crop) => {
    const soilMatch = crop.soil.includes(normalizedSoil);
    const pHMatch = pHInRange(pH, crop.pH);
    const nMatch = crop.N === nLevel || crop.N === 'medium';
    const pMatch = crop.P === pLevel || crop.P === 'medium';
    const kMatch = crop.K === kLevel || crop.K === 'medium';
    return soilMatch && pHMatch && (nMatch || pMatch || kMatch);
  });

  return suitable.length ? suitable.map((c) => c.name) : ['Wheat', 'Maize', 'Pulses (Dal)'];
}

export function getFertilizerRecommendation(N, P, K) {
  const rec = [];
  if (N < 30) rec.push('Apply Urea/DAP for Nitrogen (N)');
  if (P < 30) rec.push('Apply SSP/DAP for Phosphorus (P)');
  if (K < 30) rec.push('Apply MOP for Potassium (K)');
  if (rec.length === 0) rec.push('Soil nutrients are adequate. Maintain balanced fertilization.');
  return rec;
}

export function getCropRecommendationWithYield(soilInputs, weatherData) {
  const crops = getSuitableCropsFromSoil(
    soilInputs.soilType,
    soilInputs.pH,
    soilInputs.nitrogen,
    soilInputs.phosphorus,
    soilInputs.potassium
  );
  const temp = weatherData?.temp ?? 25;
  const rainfall = weatherData?.rainfall ?? 500;

  const yieldMultiplier = temp >= 20 && temp <= 35 && rainfall >= 400 ? 1.2 : 1;
  const baseYield = { Wheat: 45, Rice: 40, Maize: 50, Cotton: 25, Sugarcane: 70, Groundnut: 20, 'Pulses (Dal)': 15, Barley: 40, Mustard: 18, Soybean: 25 };

  const recommendations = crops.slice(0, 5).map((name) => ({
    crop: name,
    expectedYieldPerHectare: Math.round((baseYield[name] || 30) * yieldMultiplier) + ' quintals/hectare',
    suitability: 'High',
  }));

  return recommendations;
}
