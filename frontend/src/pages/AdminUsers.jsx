import { useState, useEffect } from 'react';
import api from '../services/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/admin/users')
      .then((res) => setUsers(res))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-green-800 dark:text-orange-400 mb-6">Manage Users</h1>
      {loading ? (
        <p className="text-green-600 dark:text-orange-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-green-200 dark:border-gray-600 rounded-lg overflow-hidden">
            <thead className="bg-green-100 dark:bg-gray-700">
              <tr>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-green-200 dark:border-gray-600">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
