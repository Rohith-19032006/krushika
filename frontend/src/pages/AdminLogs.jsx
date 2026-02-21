import { useState, useEffect } from 'react';
import api from '../services/api';

export default function AdminLogs() {
  const [logs, setLogs] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 0 });
  const [loading, setLoading] = useState(true);

  const fetchLogs = (page = 1) => {
    setLoading(true);
    api
      .get(`/admin/prediction-logs?page=${page}&limit=20`)
      .then((res) => {
        setLogs(res.logs);
        setPagination(res.pagination);
      })
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-800 dark:text-orange-400 mb-6">Prediction Logs</h1>
      {loading ? (
        <p className="text-green-600 dark:text-orange-400">Loading...</p>
      ) : logs.length === 0 ? (
        <p className="text-green-700 dark:text-orange-300">No prediction logs yet.</p>
      ) : (
        <>
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log._id}
                className="p-4 rounded-xl border border-green-200 dark:border-gray-600 bg-white dark:bg-[#1e1e1e] text-sm"
              >
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <span className="font-medium capitalize">{log.type}</span>
                  <span className="text-green-600 dark:text-orange-400">
                    {log.userId?.name} ({log.userId?.email})
                  </span>
                  <span className="text-gray-500">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Inputs: {JSON.stringify(log.inputs)}</p>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Outputs: {JSON.stringify(log.outputs).slice(0, 200)}...</p>
              </div>
            ))}
          </div>
          {pagination.pages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                type="button"
                disabled={pagination.page <= 1}
                onClick={() => fetchLogs(pagination.page - 1)}
                className="px-3 py-1 rounded-lg border disabled:opacity-50"
              >
                Previous
              </button>
              <span>Page {pagination.page} of {pagination.pages}</span>
              <button
                type="button"
                disabled={pagination.page >= pagination.pages}
                onClick={() => fetchLogs(pagination.page + 1)}
                className="px-3 py-1 rounded-lg border disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
