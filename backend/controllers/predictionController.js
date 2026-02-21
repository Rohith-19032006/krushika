import axios from 'axios';
import PredictionLog from '../models/PredictionLog.js';
import {
  getSuitableCropsFromSoil,
  getFertilizerRecommendation,
  getCropRecommendationWithYield,
} from '../utils/aiLogic.js';

export const soilAnalysis = async (req, res) => {
  try {
    const { soilType, pH, nitrogen, phosphorus, potassium } = req.body;
    const n = Number(nitrogen);
    const p = Number(phosphorus);
    const k = Number(potassium);
    const ph = Number(pH);

    if (!soilType || pH == null || nitrogen == null || phosphorus == null || potassium == null) {
      return res.status(400).json({ message: 'Soil type, pH, N, P, K are required.' });
    }

    const suitableCrops = getSuitableCropsFromSoil(soilType, ph, n, p, k);
    const fertilizerRec = getFertilizerRecommendation(n, p, k);

    const outputs = { suitableCrops, fertilizerRecommendation: fertilizerRec };
    await PredictionLog.create({
      userId: req.user._id,
      type: 'soil',
      inputs: { soilType, pH: ph, nitrogen: n, phosphorus: p, potassium: k },
      outputs,
    });

    res.json(outputs);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Soil analysis failed.' });
  }
};

export const weatherPrediction = async (req, res) => {
  try {
    const { location } = req.body;
    if (!location) return res.status(400).json({ message: 'Location is required.' });

    const apiKey = process.env.WEATHER_API_KEY;
    let weatherData = {
      temperature: 28,
      rainfallPrediction: 'Moderate (approx 50-100 mm)',
      condition: 'Partly cloudy',
      humidity: 65,
      windSpeed: '12 km/h',
    };

    if (apiKey) {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`
        );
        weatherData = {
          temperature: Math.round(data.main.temp),
          rainfallPrediction: data.weather?.[0]?.description || 'Check local forecast',
          condition: data.weather?.[0]?.main || 'N/A',
          humidity: data.main.humidity,
          windSpeed: `${data.wind?.speed ?? 0} m/s`,
        };
      } catch (apiErr) {
        console.warn('Weather API error, using placeholder:', apiErr.message);
      }
    }

    const outputs = weatherData;
    await PredictionLog.create({
      userId: req.user._id,
      type: 'weather',
      inputs: { location },
      outputs,
    });

    res.json(outputs);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Weather prediction failed.' });
  }
};

export const cropRecommendation = async (req, res) => {
  try {
    const { soilType, pH, nitrogen, phosphorus, potassium, location } = req.body;
    const soilInputs = {
      soilType: soilType || 'loamy',
      pH: Number(pH) || 6.5,
      nitrogen: Number(nitrogen) ?? 50,
      phosphorus: Number(phosphorus) ?? 50,
      potassium: Number(potassium) ?? 50,
    };

    let weatherData = { temp: 28, rainfall: 500 };
    if (process.env.WEATHER_API_KEY && location) {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );
        weatherData = { temp: data.main.temp, rainfall: 500 };
      } catch (_) {}
    }

    const recommendations = getCropRecommendationWithYield(soilInputs, weatherData);
    const outputs = { recommendations, soilInputs, weatherUsed: !!location };

    await PredictionLog.create({
      userId: req.user._id,
      type: 'crop',
      inputs: { ...soilInputs, location },
      outputs,
    });

    res.json(outputs);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Crop recommendation failed.' });
  }
};
