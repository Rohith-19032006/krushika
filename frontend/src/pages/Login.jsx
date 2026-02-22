import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();
  const { setToken } = useAuth();
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state?.from?.pathname) || (role === 'admin' ? '/admin' : '/home');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email: email.trim(), password, role });
      setToken(res.token, res.user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full rounded-xl border-2 px-4 py-2.5 transition focus:ring-2 outline-none dark:bg-gray-800 dark:border-gray-600 focus:ring-green-500 dark:focus:ring-orange-500';

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 animate-fade-in ${isDark ? 'hero-gradient-dark' : 'hero-gradient-light'}`}>
      <div className={`w-full max-w-md rounded-2xl shadow-2xl p-8 animate-scale-in ${isDark ? 'bg-[#1e1e1e] border-2 border-gray-700' : 'bg-white border-2 border-green-200 shadow-card'}`}>
        <h1 className="text-2xl font-bold text-center mb-2 text-green-700 dark:text-orange-400">Krushika Keerthi</h1>
        <p className="text-center text-sm text-green-600 dark:text-orange-300 mb-6">Log in to access your dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={inputClass}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
              autoComplete="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-green-800 dark:text-orange-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400 animate-fade-in">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold btn-primary disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-green-600 dark:text-orange-300">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="font-semibold underline hover:no-underline">Sign up</Link>
        </p>
        <p className="text-center text-sm mt-2">
          <Link to="/" className="text-green-600 dark:text-orange-400 hover:underline">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
