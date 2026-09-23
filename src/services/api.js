const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Error ${response.status}`)
  }

  if (response.status === 204) return null
  return response.json()
}

export const api = {
  getWorkorders: () => request('/api/workorders'),
  createWorkorder: (data) => request('/api/workorders', { method: 'POST', body: JSON.stringify(data) }),
  updateStatus: (id, status) => request(`/api/workorders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
  getCatalog: () => request('/api/catalog/services'),
  getKpis: () => request('/api/report/kpis?range=last24h'),
  getAudit: () => request('/api/audit/events'),
}

export { API_BASE_URL }
