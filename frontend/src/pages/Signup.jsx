import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

export default function Signup() {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const { setToken } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Name is required.');
      return;
    }
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name: name.trim(), email: email.trim().toLowerCase(), password, role });
      setToken(res.token, res.user);
      navigate(role === 'admin' ? '/admin' : '/home', { replace: true });
    } catch (err) {
      setError(err.message || 'Sign up failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${isDark ? 'bg-[#121212]' : 'bg-green-50'}`}>
      <div className={`w-full max-w-md rounded-2xl shadow-xl p-8 ${isDark ? 'bg-[#1e1e1e] border border-gray-700' : 'bg-white border border-green-200'}`}>
        <h1 className="text-2xl font-bold text-center mb-2 text-green-700 dark:text-orange-400">Create account</h1>
        <p className="text-center text-sm text-green-600 dark:text-orange-300 mb-6">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-green-800 dark:text-orange-200">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 dark:focus:ring-orange-500 outline-none dark:bg-gray-800 dark:border-gray-600"
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-green-800 dark:text-orange-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 dark:focus:ring-orange-500 outline-none dark:bg-gray-800 dark:border-gray-600"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-green-800 dark:text-orange-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 dark:focus:ring-orange-500 outline-none dark:bg-gray-800 dark:border-gray-600"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-green-800 dark:text-orange-200">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-green-500 dark:focus:ring-orange-500 outline-none dark:bg-gray-800 dark:border-gray-600"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-medium btn-primary disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-green-600 dark:text-orange-300">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold underline">Log in</Link>
        </p>
        <p className="text-center text-sm mt-2">
          <Link to="/" className="text-green-600 dark:text-orange-400 hover:underline">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
