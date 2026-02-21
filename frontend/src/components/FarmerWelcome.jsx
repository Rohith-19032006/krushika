import { useTheme } from '../contexts/ThemeContext';

/**
 * Farmer character SVG - simple friendly farmer with hat.
 * Arm group can be animated for wave or point.
 */
function FarmerSvg({ className, armAnimation = 'wave', delay = 0 }) {
  const { isDark } = useTheme();
  const fill = isDark ? '#f97316' : '#15803d';
  const fillLight = isDark ? '#fb923c' : '#22c55e';
  const hatFill = isDark ? '#9a3412' : '#166534';

  return (
    <svg
      className={className}
      viewBox="0 0 120 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Shadow */}
      <ellipse cx="60" cy="132" rx="28" ry="6" fill="black" opacity="0.15" />
      {/* Body (kurta / shirt) */}
      <path
        d="M40 75 L40 120 L80 120 L80 75 L75 68 L65 65 L55 65 L45 68 Z"
        fill={fill}
        stroke={fillLight}
        strokeWidth="2"
      />
      {/* Collar */}
      <path d="M52 72 L60 78 L68 72" stroke={fillLight} strokeWidth="2" fill="none" />
      {/* Head */}
      <circle cx="60" cy="48" r="22" fill="#fcd5b8" stroke="#e8b896" strokeWidth="2" />
      {/* Hat (topi / cap) */}
      <ellipse cx="60" cy="38" rx="24" ry="10" fill={hatFill} />
      <path d="M36 38 L60 22 L84 38 L60 42 Z" fill={hatFill} stroke={hatFill} strokeWidth="1" />
      {/* Waving / pointing arm */}
      <g className={armAnimation === 'wave' ? 'animate-farmer-wave' : 'animate-farmer-point'} style={{ transformOrigin: '48px 70px' }}>
        <path
          d="M48 70 L20 55 L18 72 L48 78 Z"
          fill="#fcd5b8"
          stroke="#e8b896"
          strokeWidth="1.5"
        />
        <circle cx="18" cy="62" r="6" fill="#fcd5b8" stroke="#e8b896" strokeWidth="1" />
      </g>
      {/* Other arm (by side) */}
      <path d="M72 70 L95 88 L92 95 L72 82 Z" fill="#fcd5b8" stroke="#e8b896" strokeWidth="1.5" />
      {/* Legs */}
      <path d="M48 120 L48 138 L54 138 L54 120 Z" fill="#4a5568" stroke="#2d3748" strokeWidth="1" />
      <path d="M66 120 L66 138 L72 138 L72 120 Z" fill="#4a5568" stroke="#2d3748" strokeWidth="1" />
    </svg>
  );
}

/**
 * Second farmer - smaller, welcoming (both arms up).
 */
function FarmerWelcomingSvg({ className, delay = 0 }) {
  const { isDark } = useTheme();
  const fill = isDark ? '#ea580c' : '#16a34a';
  const fillLight = isDark ? '#fb923c' : '#4ade80';

  return (
    <svg
      className={className}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ animationDelay: `${delay}ms` }}
    >
      <ellipse cx="50" cy="110" rx="22" ry="5" fill="black" opacity="0.12" />
      <path d="M35 62 L35 100 L65 100 L65 62 L60 56 L50 54 L40 56 Z" fill={fill} stroke={fillLight} strokeWidth="1.5" />
      <circle cx="50" cy="40" r="18" fill="#fcd5b8" stroke="#e8b896" strokeWidth="1.5" />
      <ellipse cx="50" cy="32" rx="20" ry="8" fill={isDark ? '#9a3412' : '#166534'} />
      {/* Both arms up (welcome) */}
      <path d="M32 56 L15 35 L12 42 L30 58 Z" fill="#fcd5b8" stroke="#e8b896" strokeWidth="1" className="animate-farmer-wave" style={{ transformOrigin: '30px 55px' }} />
      <path d="M68 56 L85 35 L88 42 L70 58 Z" fill="#fcd5b8" stroke="#e8b896" strokeWidth="1" className="animate-farmer-wave" style={{ transformOrigin: '70px 55px', animationDelay: '0.2s' }} />
      <path d="M42 100 L42 116 L48 116 L48 100 Z" fill="#4a5568" />
      <path d="M52 100 L52 116 L58 116 L58 100 Z" fill="#4a5568" />
    </svg>
  );
}

/**
 * Finger/click pointer for "click here" cue.
 */
function ClickPointerSvg({ className }) {
  const { isDark } = useTheme();
  const stroke = isDark ? '#f97316' : '#15803d';
  return (
    <svg className={className} viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 8 L30 50 L22 62 L30 58 L38 62 Z"
        fill="#fcd5b8"
        stroke="#e8b896"
        strokeWidth="2"
        className="animate-farmer-point"
        style={{ transformOrigin: '30px 8px' }}
      />
      <circle cx="30" cy="8" r="6" fill="#fcd5b8" stroke="#e8b896" strokeWidth="1" />
    </svg>
  );
}

export default function FarmerWelcome() {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col items-center gap-6 py-8">
      {/* Welcoming farmers row */}
      <div className="flex items-end justify-center gap-4 sm:gap-8">
        <div className="animate-farmer-walk-in w-24 h-28 sm:w-28 sm:h-32 flex-shrink-0" style={{ animationDelay: '200ms' }}>
          <FarmerWelcomingSvg className="w-full h-full" delay={200} />
        </div>
        <div className="animate-farmer-walk-in w-28 h-32 sm:w-32 sm:h-36 flex-shrink-0" style={{ animationDelay: '500ms' }}>
          <FarmerSvg className="w-full h-full" armAnimation="wave" delay={500} />
        </div>
        <div className="animate-farmer-walk-in w-24 h-28 sm:w-28 sm:h-32 flex-shrink-0" style={{ animationDelay: '800ms' }}>
          <FarmerWelcomingSvg className="w-full h-full" delay={800} />
        </div>
      </div>
      <p className={`text-center text-lg font-semibold animate-fade-in ${isDark ? 'text-orange-400' : 'text-green-700'}`} style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
        Farmers welcome you to Farmer Schemes & AI
      </p>
    </div>
  );
}

export function FarmerPointToLogin() {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col items-center gap-2 animate-fade-in-up">
      <p className={`text-sm font-medium ${isDark ? 'text-orange-400' : 'text-green-600'}`}>
        Click here to get started
      </p>
      <ClickPointerSvg className="w-10 h-14 animate-farmer-point" style={{ transformOrigin: 'center top' }} />
    </div>
  );
}
