import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import FarmerWelcome from '../components/FarmerWelcome';

export default function UserHome() {
  const { isDark } = useTheme();
  const sectionClass = `rounded-2xl p-6 md:p-8 mb-6 card-hover animate-fade-in-up ${isDark ? 'bg-[#1e1e1e] border-2 border-gray-700 text-orange-100 shadow-card-dark' : 'bg-white border-2 border-green-200 text-green-900 shadow-card'}`;
  const headingClass = `text-xl md:text-2xl font-bold mb-3 ${isDark ? 'text-orange-400' : 'text-green-800'}`;
  const paraClass = `leading-relaxed ${isDark ? 'text-orange-200/90' : 'text-green-700'}`;

  return (
    <div className="max-w-4xl animate-fade-in">
      <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDark ? 'text-orange-400' : 'text-green-800'}`}>
        Welcome to Krushika keerthi
      </h1>
      <p className={`text-lg mb-4 ${isDark ? 'text-orange-300' : 'text-green-600'}`}>
        Your one-stop platform for government schemes and smart farming tools.
      </p>
      <FarmerWelcome />
      <p className={`text-lg mb-8 ${isDark ? 'text-orange-300/80' : 'text-green-600/80'}`}>
        Explore the sections below or use the menu to get started.
      </p>

      {/* What is this platform */}
      <section className={sectionClass} style={{ animationDelay: '50ms' }}>
        <h2 className={headingClass}>What is this platform?</h2>
        <p className={`${paraClass} mb-3`}>
          <strong>Farmer Schemes & AI</strong> is a web application built for Indian farmers and anyone interested in agriculture. It brings together two main things: (1) <strong>Government Schemes</strong> — a searchable list of central and state schemes for farmers, with eligibility, benefits, and apply links — and (2) <strong>Smart AI Prediction</strong> — tools that suggest suitable crops, fertilizer use, and weather information based on your soil and location.
        </p>
        <p className={paraClass}>
          You can use this platform to discover schemes you may be eligible for, and to get data-driven suggestions for what to grow and how to care for your soil. All of this is available after you log in, from the menu on the left.
        </p>
      </section>

      {/* Government Schemes – detailed */}
      <section className={sectionClass}>
        <h2 className={headingClass}>Government Schemes</h2>
        <p className={`${paraClass} mb-3`}>
          Under <strong>Government Schemes</strong> you will find a list of farmer-related schemes run by the Government of India (and references to state-level initiatives). Each scheme is displayed with:
        </p>
        <ul className={`list-disc list-inside space-y-1 mb-3 ${paraClass}`}>
          <li><strong>Scheme name</strong> — e.g. PM-KISAN, PMFBY, Kisan Credit Card, Soil Health Card.</li>
          <li><strong>Description</strong> — what the scheme is and whom it is for.</li>
          <li><strong>Eligibility criteria</strong> — who can apply (e.g. landholding size, type of farmer).</li>
          <li><strong>Benefits</strong> — what you get (financial support, insurance, credit, inputs, etc.).</li>
          <li><strong>Apply link</strong> — official website or portal where you can apply or get more details.</li>
        </ul>
        <p className={`${paraClass} mb-3`}>
          You can <strong>search</strong> by keyword (e.g. “insurance” or “credit”), <strong>filter</strong> by category (Income Support, Insurance, Credit, Soil & Input, Crop Support, State Support), and move through pages if there are many schemes. Use the <strong>Apply</strong> button on a scheme to open the official link in a new tab. This section is read-only for you; only admins can add, edit, or delete schemes.
        </p>
        <Link
          to="/schemes"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold btn-primary"
        >
          Open Government Schemes →
        </Link>
      </section>

      {/* Smart AI Prediction – detailed */}
      <section className={sectionClass} style={{ animationDelay: '100ms' }}>
        <h2 className={headingClass}>Smart AI Prediction</h2>
        <p className={`${paraClass} mb-3`}>
          <strong>Smart AI Prediction</strong> has three tools. You can switch between them using the tabs on that page.
        </p>
        <ol className={`list-decimal list-inside space-y-2 mb-3 ${paraClass}`}>
          <li>
            <strong>Soil Analysis</strong> — You enter your <strong>soil type</strong> (e.g. clay, sandy, loamy), <strong>pH</strong>, and levels of <strong>Nitrogen (N), Phosphorus (P), and Potassium (K)</strong>. The system suggests <strong>suitable crops</strong> and <strong>fertilizer recommendations</strong> (e.g. when to add N, P, or K). Use this to plan what to grow and how to improve soil health.
          </li>
          <li>
            <strong>Weather Prediction</strong> — You enter your <strong>location</strong> (city or region). The app shows current <strong>temperature</strong>, <strong>weather condition</strong>, <strong>rainfall/precipitation</strong> information, <strong>humidity</strong>, and <strong>wind</strong>. Where available, we use a weather API; otherwise we show placeholder or typical values. This helps you plan fieldwork and irrigation.
          </li>
          <li>
            <strong>Crop Recommendation</strong> — You provide <strong>soil details</strong> (soil type, pH, N, P, K) and optionally your <strong>location</strong>. The system combines this with simple rules (and weather if location is given) to recommend <strong>best crops to grow</strong> and <strong>expected yield</strong> (e.g. in quintals per hectare). This helps you decide which crop is most suitable for your conditions.
          </li>
        </ol>
        <p className={`${paraClass} mb-3`}>
          Predictions are based on rule-based logic and, for weather, external APIs where configured. Results are for guidance only; always follow local agronomic and official advice.
        </p>
        <Link
          to="/prediction"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold btn-primary"
        >
          Open Smart AI Prediction →
        </Link>
      </section>

      {/* How to use this site */}
      <section className={sectionClass} style={{ animationDelay: '150ms' }}>
        <h2 className={headingClass}>How to use this site</h2>
        <p className={`${paraClass} mb-3`}>
          After login, this <strong>Home</strong> page is your starting point. From the left menu you can:
        </p>
        <ul className={`list-disc list-inside space-y-1 mb-3 ${paraClass}`}>
          <li>Return <strong>Home</strong> anytime to read this explanation.</li>
          <li>Open <strong>Government Schemes</strong> to browse, search, and filter schemes and use the Apply links.</li>
          <li>Open <strong>Smart AI Prediction</strong> to use soil analysis, weather, and crop recommendation tools.</li>
        </ul>
        <p className={paraClass}>
          Use the theme toggle (sun/moon icon) in the header to switch between light and dark mode. Your preference is saved. If you are an admin, you will also see links to manage users, schemes, and view prediction logs.
        </p>
      </section>

      {/* Quick links */}
      <section className={sectionClass} style={{ animationDelay: '200ms' }}>
        <h2 className={headingClass}>Quick links</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/schemes"
            className={`px-5 py-3 rounded-xl font-semibold border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
              isDark ? 'border-orange-500 text-orange-400 hover:bg-orange-500/20' : 'border-green-600 text-green-700 hover:bg-green-100'
            }`}
          >
            Government Schemes
          </Link>
          <Link
            to="/prediction"
            className={`px-5 py-3 rounded-xl font-semibold border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
              isDark ? 'border-orange-500 text-orange-400 hover:bg-orange-500/20' : 'border-green-600 text-green-700 hover:bg-green-100'
            }`}
          >
            Smart AI Prediction
          </Link>
        </div>
      </section>
    </div>
  );
}
