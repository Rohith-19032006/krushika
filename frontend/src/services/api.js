const BASE = '/api';

function getToken() {
  return localStorage.getItem('farmer-app-token');
}

async function request(method, url, data = null) {
  const opts = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(getToken() && { Authorization: `Bearer ${getToken()}` }),
    },
  };
  if (data && (method === 'POST' || method === 'PUT')) opts.body = JSON.stringify(data);
  let res;
  try {
    res = await fetch(BASE + url, opts);
  } catch (err) {
    if (err.message === 'Failed to fetch' || err.name === 'TypeError') {
      throw new Error('Cannot reach server. Make sure the backend is running on port 5000.');
    }
    throw err;
  }
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.message || res.statusText || 'Request failed');
  return json;
}

const api = {
  get: (url) => request('GET', url),
  post: (url, data) => request('POST', url, data),
  put: (url, data) => request('PUT', url, data),
  delete: (url) => request('DELETE', url),
};

export default api;
