import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import api from '../services/api';

export default function Schemes() {
  const { isAdmin } = useAuth();
  const { isDark } = useTheme();
  const [schemes, setSchemes] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // { type: 'add'|'edit', scheme?: {} }
  const [form, setForm] = useState({ name: '', description: '', eligibilityCriteria: '', benefits: '', applyLink: '', category: 'General' });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSchemes = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({ page, limit: 10 });
      if (search) params.set('search', search);
      if (filter) params.set('filter', filter);
      const res = await api.get(`/schemes?${params}`);
      setSchemes(Array.isArray(res.schemes) ? res.schemes : []);
      setPagination(res.pagination || { page: 1, limit: 10, total: 0, pages: 0 });
    } catch (err) {
      setError(err.message || 'Could not load schemes. Please try again.');
      setSchemes([]);
      setPagination({ page: 1, limit: 10, total: 0, pages: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setError('');
    fetchSchemes(1);
  }, []);

  const handleSearch = (e) => {
    e?.preventDefault();
    fetchSchemes(1);
  };

  const openAdd = () => {
    setForm({ name: '', description: '', eligibilityCriteria: '', benefits: '', applyLink: '', category: 'General' });
    setModal({ type: 'add' });
    setError('');
  };

  const openEdit = (scheme) => {
    setForm({
      name: scheme.name,
      description: scheme.description,
      eligibilityCriteria: scheme.eligibilityCriteria,
      benefits: scheme.benefits,
      applyLink: scheme.applyLink,
      category: scheme.category || 'General',
    });
    setModal({ type: 'edit', scheme });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError('');
    try {
      if (modal.type === 'add') {
        await api.post('/schemes', form);
      } else {
        await api.put(`/schemes/${modal.scheme._id}`, form);
      }
      setModal(null);
      fetchSchemes(pagination.page);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this scheme?')) return;
    try {
      await api.delete(`/schemes/${id}`);
      fetchSchemes(pagination.page);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className={`rounded-2xl p-5 mb-6 ${isDark ? 'bg-gradient-to-br from-[#1e1e1e] to-[#252525] border border-gray-600' : 'bg-gradient-to-br from-white to-green-50/50 border-2 border-green-200 shadow-card'}`}>
        <h1 className="text-3xl font-bold text-green-800 dark:text-orange-400 mb-1">Government Schemes</h1>
        <p className="text-green-600 dark:text-orange-300 text-sm mb-4">Browse, search and filter farmer-related schemes. Use Apply to open the official link.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 flex-wrap">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search schemes..."
            className="flex-1 min-w-[140px] rounded-xl border-2 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-green-500 dark:focus:ring-orange-500 outline-none transition"
          />
          <select
            value={filter}
            onChange={(e) => { setFilter(e.target.value); fetchSchemes(1); }}
            className="rounded-xl border-2 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-600 focus:ring-2 outline-none transition"
          >
            <option value="">All categories</option>
            <option value="Income Support">Income Support</option>
            <option value="Insurance">Insurance</option>
            <option value="Credit">Credit</option>
            <option value="Soil & Input">Soil & Input</option>
            <option value="Crop Support">Crop Support</option>
            <option value="State Support">State Support</option>
          </select>
          <button type="submit" className="px-5 py-2.5 rounded-xl btn-primary font-semibold">Search</button>
        </form>
        {isAdmin && (
          <button type="button" onClick={openAdd} className="px-5 py-2.5 rounded-xl btn-primary whitespace-nowrap font-semibold">
            Add Scheme
          </button>
        )}
      </div>

      {error && <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>}

      {loading ? (
        <div className="py-8 text-center">
          <p className="text-green-600 dark:text-orange-400">Loading schemes...</p>
        </div>
      ) : error && schemes.length === 0 ? (
        <div className={`py-8 px-4 rounded-xl ${isDark ? 'bg-[#1e1e1e] border border-gray-600' : 'bg-green-50 border border-green-200'}`}>
          <p className="text-red-600 dark:text-red-400 mb-2">{error}</p>
          <button type="button" onClick={() => fetchSchemes(1)} className="px-4 py-2 rounded-lg btn-primary">
            Retry
          </button>
        </div>
      ) : schemes.length === 0 ? (
        <div className={`py-8 px-4 rounded-xl text-center ${isDark ? 'bg-[#1e1e1e] border border-gray-600' : 'bg-green-50 border border-green-200'}`}>
          <p className="text-green-700 dark:text-orange-300">No schemes found. Try changing search or filter.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {schemes.map((s, i) => (
              <div
                key={s._id}
                className={`p-5 rounded-2xl border-2 card-hover animate-fade-in-up bg-white dark:bg-[#1e1e1e] border-green-200 dark:border-gray-600 shadow-card dark:shadow-card-dark`}
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <h2 className="font-bold text-lg text-green-800 dark:text-orange-300">{s.name}</h2>
                <p className="text-sm text-green-600 dark:text-orange-200/80 mt-1">{s.description}</p>
                <p className="text-xs mt-2"><span className="font-semibold">Eligibility:</span> {s.eligibilityCriteria}</p>
                <p className="text-xs mt-1"><span className="font-semibold">Benefits:</span> {s.benefits}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={s.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm px-4 py-2 rounded-xl btn-primary inline-block font-medium"
                  >
                    Apply
                  </a>
                  {isAdmin && (
                    <>
                      <button type="button" onClick={() => openEdit(s)} className="text-sm px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-600 font-medium transition hover:opacity-90">Edit</button>
                      <button type="button" onClick={() => handleDelete(s._id)} className="text-sm px-4 py-2 rounded-xl bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-medium transition hover:opacity-90">Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                type="button"
                disabled={pagination.page <= 1}
                onClick={() => fetchSchemes(pagination.page - 1)}
                className="px-3 py-1 rounded-lg border disabled:opacity-50"
              >
                Previous
              </button>
              <span className="py-1 px-2">Page {pagination.page} of {pagination.pages}</span>
              <button
                type="button"
                disabled={pagination.page >= pagination.pages}
                onClick={() => fetchSchemes(pagination.page + 1)}
                className="px-3 py-1 rounded-lg border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setModal(null)}>
          <div className="bg-white dark:bg-[#1e1e1e] rounded-xl max-w-lg w-full p-6 shadow-xl border border-green-200 dark:border-gray-600" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-green-800 dark:text-orange-400 mb-4">{modal.type === 'add' ? 'Add Scheme' : 'Edit Scheme'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border px-3 py-2 dark:bg-gray-800" />
              <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-lg border px-3 py-2 dark:bg-gray-800" rows={2} />
              <textarea required placeholder="Eligibility Criteria" value={form.eligibilityCriteria} onChange={(e) => setForm({ ...form, eligibilityCriteria: e.target.value })} className="w-full rounded-lg border px-3 py-2 dark:bg-gray-800" rows={2} />
              <textarea required placeholder="Benefits" value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} className="w-full rounded-lg border px-3 py-2 dark:bg-gray-800" rows={2} />
              <input required placeholder="Apply Link" type="url" value={form.applyLink} onChange={(e) => setForm({ ...form, applyLink: e.target.value })} className="w-full rounded-lg border px-3 py-2 dark:bg-gray-800" />
              <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-lg border px-3 py-2 dark:bg-gray-800" />
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div className="flex gap-2">
                <button type="submit" disabled={submitLoading} className="px-4 py-2 rounded-lg btn-primary">Save</button>
                <button type="button" onClick={() => setModal(null)} className="px-4 py-2 rounded-lg border">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
