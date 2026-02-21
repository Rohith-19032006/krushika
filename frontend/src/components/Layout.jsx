import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function Layout({ children }) {
  const { user, logout, isAdmin } = useAuth();
  const { isDark, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? isDark
          ? 'bg-orange-600 text-white shadow-lg'
          : 'bg-green-600 text-white shadow-lg'
        : isDark
        ? 'text-orange-200 hover:bg-gray-700 hover:translate-x-0.5'
        : 'text-green-800 hover:bg-green-100 hover:translate-x-0.5'
    }`;

  const userLinks = [
    { to: '/home', label: 'Home' },
    { to: '/schemes', label: 'Government Schemes' },
    { to: '/prediction', label: 'Smart AI Prediction' },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Admin Dashboard' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/schemes', label: 'Manage Schemes' },
    { to: '/admin/logs', label: 'Prediction Logs' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-green-900 dark:text-orange-100">
      <header className="sticky top-0 z-40 border-b-2 border-green-200 dark:border-gray-700 bg-white/95 dark:bg-[#1e1e1e] backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-current"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <NavLink to={isAdmin ? '/admin' : '/home'} className="font-bold text-lg text-inherit">
            Farmer Schemes
          </NavLink>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              className="p-2 rounded-xl bg-green-100 dark:bg-gray-700 text-green-700 dark:text-orange-400 transition-transform hover:scale-110"
              aria-label="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              type="button"
              onClick={logout}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              Logout
            </button>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 flex-shrink-0 bg-green-600 dark:bg-orange-600 border-green-500 dark:border-orange-500 shadow-md overflow-hidden"
              title={user?.name || 'User'}
            >
              {user?.name ? (
                <span className="select-none">{user.name.charAt(0).toUpperCase()}</span>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.2 0-6 1.8-6 4v2h12v-2c0-2.2-2.8-4-6-4z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`${
            mobileOpen ? 'block' : 'hidden'
          } md:block w-56 border-r border-green-200 dark:border-gray-700 bg-green-50/50 dark:bg-[#1e1e1e] min-h-[calc(100vh-3.5rem)] py-4`}
        >
          <nav className="px-2 space-y-1">
            {userLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} className={navClass} onClick={() => setMobileOpen(false)}>
                {label}
              </NavLink>
            ))}
            {isAdmin &&
              adminLinks.map(({ to, label }) => (
                <NavLink key={to} to={to} className={navClass} onClick={() => setMobileOpen(false)}>
                  {label}
                </NavLink>
              ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6 max-w-6xl mx-auto w-full">
          {typeof children !== 'undefined' ? children : <Outlet />}
        </main>
      </div>
    </div>
  );
}
