import { useState } from 'react';
import api from '../services/api';
import { useTheme } from '../contexts/ThemeContext';
import { SoilIcon, WeatherIcon, CropIcon } from '../components/PredictionIcons';

const tabs = [
  { label: 'Soil Analysis', icon: SoilIcon },
  { label: 'Weather Prediction', icon: WeatherIcon },
  { label: 'Crop Recommendation', icon: CropIcon },
];

export default function SmartPrediction() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [showDataInfo, setShowDataInfo] = useState(false);

  const [soil, setSoil] = useState({ soilType: 'loamy', pH: '6.5', nitrogen: '50', phosphorus: '50', potassium: '50' });
  const [weatherLocation, setWeatherLocation] = useState('');
  const [cropInputs, setCropInputs] = useState({
    soilType: 'loamy', pH: '6.5', nitrogen: '50', phosphorus: '50', potassium: '50', location: '',
  });

  const runSoil = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await api.post('/predictions/soil', soil);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const runWeather = async (e) => {
    e.preventDefault();
    if (!weatherLocation.trim()) {
      setError('Enter location.');
      return;
    }
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await api.post('/predictions/weather', { location: weatherLocation.trim() });
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const runCrop = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await api.post('/predictions/crop', cropInputs);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full rounded-xl border-2 px-4 py-2.5 transition focus:ring-2 outline-none dark:bg-gray-800 dark:border-gray-600 focus:ring-green-500 dark:focus:ring-orange-500';
  const resultBoxClass = 'mt-5 p-5 rounded-2xl border-2 animate-scale-in shadow-card dark:shadow-card-dark border-green-300 dark:border-orange-500/50 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800/90 dark:to-gray-800/50';

  return (
    <div className="animate-fade-in">
      <div className={`rounded-2xl p-6 mb-6 ${isDark ? 'bg-gradient-to-br from-[#1e1e1e] to-[#252525] border border-gray-600' : 'bg-gradient-to-br from-white to-green-50/50 border-2 border-green-200 shadow-card'}`}>
        <h1 className="text-3xl font-bold text-green-800 dark:text-orange-400 mb-2">Smart AI Prediction</h1>
        <p className="text-green-600 dark:text-orange-300 mb-4">Use the tabs below to run soil analysis, get weather for your location, or get crop recommendations with expected yield.</p>

        <button
          type="button"
          onClick={() => setShowDataInfo((s) => !s)}
          className={`text-sm font-medium px-3 py-1.5 rounded-lg transition ${isDark ? 'bg-gray-700 text-orange-300 hover:bg-gray-600' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
        >
          {showDataInfo ? '− Hide' : '+ Show'} dataset & how predictions work
        </button>
        {showDataInfo && (
          <div className={`mt-4 p-4 rounded-xl text-sm animate-fade-in ${isDark ? 'bg-gray-800/80 border border-gray-600 text-orange-200/90' : 'bg-green-50 border border-green-200 text-green-800'}`}>
            <p className="font-semibold mb-2">What we use for predictions</p>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li><strong>Soil & crop dataset:</strong> 10 crops (Wheat, Rice, Maize, Cotton, Sugarcane, Groundnut, Pulses, Barley, Mustard, Soybean) with preferred soil types (clay, sandy, loamy, silt, peat), pH ranges, and N/P/K levels (low &lt;30%, medium 30–70%, high 70%+).</li>
              <li><strong>Fertilizer rules:</strong> If N, P, or K is below 30%, we recommend Urea/DAP (N), SSP/DAP (P), or MOP (K) respectively.</li>
              <li><strong>Yield:</strong> Base yield per crop (quintals/hectare) from agronomic references; adjusted by temperature (20–35°C) and rainfall when location is given.</li>
              <li><strong>Weather:</strong> Live data from <strong>OpenWeatherMap API</strong> when an API key is set; otherwise placeholder values for demo.</li>
            </ul>
            <p className="mt-2 opacity-80">Results are for guidance only; always follow local agronomic advice.</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => { setActiveTab(i); setError(''); setResult(null); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap font-semibold transition-all duration-300 ${
                activeTab === i
                  ? 'btn-primary shadow-lg scale-105'
                  : isDark
                    ? 'bg-gray-700 text-orange-200 hover:bg-gray-600 hover:scale-[1.02]'
                    : 'bg-green-100 text-green-800 hover:bg-green-200 hover:scale-[1.02]'
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Icon />
              {tab.label}
            </button>
          );
        })}
      </div>

      {error && <p className="text-red-600 dark:text-red-400 mb-4 animate-fade-in">{error}</p>}
      {loading && <p className="text-green-600 dark:text-orange-400 mb-4 animate-pulse-soft">Processing...</p>}

      {activeTab === 0 && (
        <div className={`rounded-2xl p-6 card-hover animate-fade-in-up ${isDark ? 'bg-[#1e1e1e] border-2 border-gray-600 shadow-card-dark' : 'bg-white border-2 border-green-200 shadow-card'}`}>
          <div className="flex items-center gap-3 mb-4">
            <SoilIcon large />
            <h2 className="text-xl font-bold text-green-800 dark:text-orange-400">Soil Analysis</h2>
          </div>
          <p className="text-sm text-green-600 dark:text-orange-300 mb-5">Enter soil type, pH and nutrient levels (N, P, K) to get suitable crops and fertilizer advice.</p>
          <form onSubmit={runSoil} className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">Soil Type</label>
              <select value={soil.soilType} onChange={(e) => setSoil({ ...soil, soilType: e.target.value })} className={inputClass}>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="silt">Silt</option>
                <option value="peat">Peat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">pH Level (4–9)</label>
              <input type="number" step="0.1" min="4" max="9" value={soil.pH} onChange={(e) => setSoil({ ...soil, pH: e.target.value })} className={inputClass} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">N (%)</label>
                <input type="number" min="0" max="100" value={soil.nitrogen} onChange={(e) => setSoil({ ...soil, nitrogen: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">P (%)</label>
                <input type="number" min="0" max="100" value={soil.phosphorus} onChange={(e) => setSoil({ ...soil, phosphorus: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">K (%)</label>
                <input type="number" min="0" max="100" value={soil.potassium} onChange={(e) => setSoil({ ...soil, potassium: e.target.value })} className={inputClass} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl btn-primary font-semibold">Analyze Soil</button>
          </form>
          {result && (
            <div className={resultBoxClass}>
              <p className="font-bold text-green-800 dark:text-orange-400">Results</p>
              <p className="font-medium mt-2 text-green-700 dark:text-orange-300">Suitable crops:</p>
              <p className="text-sm">{result.suitableCrops?.join(', ') || '—'}</p>
              <p className="font-medium mt-2 text-green-700 dark:text-orange-300">Fertilizer recommendation:</p>
              <ul className="list-disc list-inside text-sm">{result.fertilizerRecommendation?.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 1 && (
        <div className={`rounded-2xl p-6 card-hover animate-fade-in-up ${isDark ? 'bg-[#1e1e1e] border-2 border-gray-600 shadow-card-dark' : 'bg-white border-2 border-green-200 shadow-card'}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="animate-weather-float">
              <WeatherIcon />
            </div>
            <h2 className="text-xl font-bold text-green-800 dark:text-orange-400">Weather Prediction</h2>
          </div>
          <p className="text-sm text-green-600 dark:text-orange-300 mb-5">Enter your city or region to get current temperature, condition, and rainfall info.</p>
          <form onSubmit={runWeather} className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">Location</label>
              <input type="text" value={weatherLocation} onChange={(e) => setWeatherLocation(e.target.value)} placeholder="e.g. Mumbai, Delhi, Chennai" className={inputClass} />
            </div>
            <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl btn-primary font-semibold">Get Weather</button>
          </form>
          {result && (
            <div className={resultBoxClass}>
              <p className="font-bold text-green-800 dark:text-orange-400">Weather</p>
              <p><span className="font-medium">Temperature:</span> {result.temperature}°C</p>
              <p><span className="font-medium">Condition:</span> {result.condition}</p>
              <p><span className="font-medium">Rainfall / Precip:</span> {result.rainfallPrediction}</p>
              <p><span className="font-medium">Humidity:</span> {result.humidity}%</p>
              <p><span className="font-medium">Wind:</span> {result.windSpeed}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 2 && (
        <div className={`rounded-2xl p-6 card-hover animate-fade-in-up ${isDark ? 'bg-[#1e1e1e] border-2 border-gray-600 shadow-card-dark' : 'bg-white border-2 border-green-200 shadow-card'}`}>
          <div className="flex items-center gap-3 mb-4">
            <CropIcon large />
            <h2 className="text-xl font-bold text-green-800 dark:text-orange-400">Crop Recommendation</h2>
          </div>
          <p className="text-sm text-green-600 dark:text-orange-300 mb-5">Enter soil details (and optional location) to get the best crops to grow and expected yield.</p>
          <form onSubmit={runCrop} className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">Soil Type</label>
              <select value={cropInputs.soilType} onChange={(e) => setCropInputs({ ...cropInputs, soilType: e.target.value })} className={inputClass}>
                <option value="clay">Clay</option>
                <option value="sandy">Sandy</option>
                <option value="loamy">Loamy</option>
                <option value="silt">Silt</option>
                <option value="peat">Peat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">pH</label>
              <input type="number" step="0.1" value={cropInputs.pH} onChange={(e) => setCropInputs({ ...cropInputs, pH: e.target.value })} className={inputClass} />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div><label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">N</label><input type="number" value={cropInputs.nitrogen} onChange={(e) => setCropInputs({ ...cropInputs, nitrogen: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">P</label><input type="number" value={cropInputs.phosphorus} onChange={(e) => setCropInputs({ ...cropInputs, phosphorus: e.target.value })} className={inputClass} /></div>
              <div><label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">K</label><input type="number" value={cropInputs.potassium} onChange={(e) => setCropInputs({ ...cropInputs, potassium: e.target.value })} className={inputClass} /></div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">Location (optional)</label>
              <input type="text" value={cropInputs.location} onChange={(e) => setCropInputs({ ...cropInputs, location: e.target.value })} placeholder="City for weather" className={inputClass} />
            </div>
            <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-xl btn-primary font-semibold">Get Crop Recommendation</button>
          </form>
          {result?.recommendations && result.recommendations.length > 0 && (
            <div className={resultBoxClass}>
              <p className="font-bold text-green-800 dark:text-orange-400 mb-2">Recommended crops</p>
              {result.recommendations.map((r, i) => (
                <div key={i} className="py-2 border-b border-green-200 dark:border-gray-600 last:border-0">
                  <p className="font-medium">{r.crop}</p>
                  <p className="text-sm">Yield: {r.expectedYieldPerHectare} — {r.suitability}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
