import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

export default function AdminDashboard() {
  const { isDark } = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/admin/stats')
      .then((res) => setStats(res))
      .catch(() => setStats({ userCount: 0, schemeCount: 0, predictionCount: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { title: 'Users', value: stats?.userCount ?? '-', to: '/admin/users', icon: '👥' },
    { title: 'Schemes', value: stats?.schemeCount ?? '-', to: '/admin/schemes', icon: '📄' },
    { title: 'Prediction Logs', value: stats?.predictionCount ?? '-', to: '/admin/logs', icon: '🤖' },
  ];

  if (loading) return <p className="text-green-600 dark:text-orange-400">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-800 dark:text-orange-400 mb-2">Admin Dashboard</h1>
      <p className="text-green-600 dark:text-orange-300 mb-6">Manage users, schemes and view analytics.</p>

      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map(({ title, value, to, icon }) => (
          <Link
            key={to}
            to={to}
            className={`p-6 rounded-xl border-2 transition hover:shadow-lg ${
              isDark ? 'border-gray-600 hover:border-orange-500 bg-[#1e1e1e]' : 'border-green-200 hover:border-green-500 bg-white'
            }`}
          >
            <span className="text-3xl block mb-2">{icon}</span>
            <h2 className="text-lg font-semibold text-green-800 dark:text-orange-300">{title}</h2>
            <p className="text-2xl font-bold text-green-600 dark:text-orange-400 mt-1">{value}</p>
          </Link>
        ))}
      </div>

      {stats?.predictionsByType && Object.keys(stats.predictionsByType).length > 0 && (
        <div className="mt-8 p-4 rounded-xl border border-green-200 dark:border-gray-600">
          <h2 className="font-semibold text-green-800 dark:text-orange-400 mb-2">Predictions by type</h2>
          <ul className="space-y-1 text-sm">
            {Object.entries(stats.predictionsByType).map(([type, count]) => (
              <li key={type}>{type}: {count}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
