import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import FarmerWelcome, { FarmerPointToLogin } from '../components/FarmerWelcome';

export default function Home() {
  const { isDark } = useTheme();
  const sectionClass = `rounded-2xl p-6 md:p-8 mb-6 card-hover animate-fade-in-up ${isDark ? 'bg-[#1e1e1e] border-2 border-gray-700 text-orange-100 shadow-card-dark' : 'bg-white border-2 border-green-200 text-green-900 shadow-card'}`;
  const headingClass = `text-xl md:text-2xl font-bold mb-3 ${isDark ? 'text-orange-400' : 'text-green-800'}`;
  const paraClass = isDark ? 'text-orange-200/90 leading-relaxed' : 'text-green-700 leading-relaxed';

  return (
    <div className={`min-h-screen ${isDark ? 'hero-gradient-dark text-orange-100' : 'hero-gradient-light text-green-900'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 tracking-tight ${isDark ? 'text-orange-400' : 'text-green-700'}`}>
            Farmer Schemes & AI
          </h1>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-6 ${isDark ? 'text-orange-300' : 'text-green-600'}`}>
            Your gateway to Indian government schemes for farmers and smart predictions for soil, weather and crops.
          </p>
          <FarmerWelcome />
        </div>

        <section className={`${sectionClass} animate-delay-100`} style={{ animationDelay: '100ms' }}>
          <h2 className={headingClass}>Indian Farmers & Agriculture History</h2>
          <p className={`${paraClass} mb-3`}>
            Agriculture has been the backbone of India for thousands of years. Around 58% of rural households depend on farming. India is among the top producers of rice, wheat, cotton, sugarcane, and many fruits and vegetables. The Green Revolution in the 1960s–70s transformed food grain production and made India self-reliant in staple crops.
          </p>
          <p className={`${paraClass} mb-3`}>
            Indian farmers grow a wide variety of crops across different climates—from rice and wheat in the north to spices and coconut in the south. Despite challenges like small landholdings, water scarcity, and climate change, farmers continue to feed the nation. The government runs several schemes to support them with income, insurance, credit, and modern inputs.
          </p>
          <p className={paraClass}>
            Today, digital tools and AI can help farmers make better decisions: which crops to grow, when to irrigate, and how to improve soil health. This platform brings together government schemes and smart prediction tools in one place for the benefit of Indian farmers.
          </p>
        </section>

        <section className={`${sectionClass} animate-delay-200`} style={{ animationDelay: '200ms' }}>
          <h2 className={headingClass}>About This Website</h2>
          <p className={`${paraClass} mb-3`}>
            This is the home page of <strong>Farmer Schemes & AI</strong>. Here you can learn about Indian agriculture and then sign in to use the full platform.
          </p>
          <p className={`${paraClass} mb-3`}>
            <strong>Government Schemes</strong> — After logging in, you can browse and search central and state schemes for farmers (e.g. PM-KISAN, crop insurance, credit, soil health). Each scheme shows eligibility, benefits, and an apply link.
          </p>
          <p className={`${paraClass} mb-3`}>
            <strong>Smart AI Prediction</strong> — Use soil analysis (soil type, pH, N, P, K) to get suitable crops and fertilizer advice; get weather for your location; and get crop recommendations with expected yield based on soil and weather.
          </p>
          <p className={paraClass}>
            Create an account or log in to access the dashboard, schemes, and AI tools. We are committed to supporting Indian farmers with information and technology.
          </p>
        </section>

        <div className="text-center mt-10 animate-fade-in-up">
          <FarmerPointToLogin />
          <p className={`text-sm mb-5 mt-4 ${isDark ? 'text-orange-300/80' : 'text-green-600'}`}>
            New here? Sign up for an account. Already have one? Log in to continue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/login"
              className="w-full sm:w-auto min-w-[220px] py-3.5 px-6 rounded-xl font-semibold text-center btn-primary text-lg"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`w-full sm:w-auto min-w-[220px] py-3.5 px-6 rounded-xl font-semibold text-center border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                isDark ? 'border-orange-500 text-orange-400 hover:bg-orange-500/20' : 'border-green-600 text-green-700 hover:bg-green-100'
              }`}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
