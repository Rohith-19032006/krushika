import { useTheme } from '../contexts/ThemeContext';

const iconClass = 'w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0';

/** In section headers we use slightly larger */
const iconClassLarge = 'w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0';

/** Soil layers / pile - animated pulse */
export function SoilIcon({ large }) {
  const { isDark } = useTheme();
  const fill = isDark ? '#9a3412' : '#166534';
  const fillLight = isDark ? '#c2410c' : '#22c55e';
  return (
    <svg className={`${large ? iconClassLarge : iconClass} animate-soil-pulse`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="32" rx="14" ry="5" fill={fill} opacity="0.9" />
      <path d="M8 28 Q20 18 32 28 L32 36 Q20 26 8 36 Z" fill={fill} />
      <path d="M10 26 Q20 17 30 26 L30 33 Q20 24 10 33 Z" fill={fillLight} opacity="0.8" />
    </svg>
  );
}

/** Weather: cloud + sun/rain - floating */
export function WeatherIcon({ large }) {
  const { isDark } = useTheme();
  const cloud = isDark ? '#94a3b8' : '#64748b';
  const sun = isDark ? '#fbbf24' : '#eab308';
  return (
    <svg className={`${large ? iconClassLarge : iconClass} animate-weather-float`} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="12" r="6" fill={sun} opacity="0.95" />
      <path d="M8 24 C8 20 12 18 16 18 C16 14 22 12 26 16 C32 16 36 20 36 25 C36 29 33 32 28 32 L10 32 C6 32 4 28 4 25 C4 22 6 24 8 24 Z" fill={cloud} />
      <path d="M18 26 L18 32 M22 28 L22 34 M26 26 L26 32" stroke={cloud} strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

/** Crop/plant growing from soil */
export function CropIcon({ large }) {
  const { isDark } = useTheme();
  const soil = isDark ? '#78350f' : '#166534';
  const stem = isDark ? '#22c55e' : '#16a34a';
  const leaf = isDark ? '#4ade80' : '#22c55e';
  return (
    <svg className={large ? iconClassLarge : iconClass} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="20" cy="34" rx="12" ry="4" fill={soil} />
      <path d="M20 34 L20 14" stroke={stem} strokeWidth="3" strokeLinecap="round" className="animate-crop-grow" style={{ transformOrigin: '20px 34px' }} />
      <path d="M20 18 L12 22 L20 20 L28 24 Z" fill={leaf} className="animate-crop-grow" style={{ animationDelay: '0.3s', transformOrigin: '20px 34px' }} />
      <path d="M20 24 L10 30 L20 26 L30 32 Z" fill={leaf} opacity="0.9" className="animate-crop-grow" style={{ animationDelay: '0.5s', transformOrigin: '20px 34px' }} />
    </svg>
  );
}
