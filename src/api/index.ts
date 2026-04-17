const API_BASE = `${import.meta.env.VITE_API_URL || ''}/api`;
const getHeaders = () => {
  const token = localStorage.getItem("admin_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Public
  getPublicStats: () => fetch(`${API_BASE}/public/stats`).then(res => res.json()),
  getPublicNotices: () => fetch(`${API_BASE}/public/notices`).then(res => res.json()),
  submitAdvice: (data: any) => fetch(`${API_BASE}/public/advice`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(res => res.json()),
  reportPayment: (data: any) => fetch(`${API_BASE}/public/report-payment`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(res => res.json()),

  // Admin
  login: (credentials: any) => fetch(`${API_BASE}/admin/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  }).then(res => res.json()),
  
  getMembers: () => fetch(`${API_BASE}/admin/members`, { headers: getHeaders() }).then(res => res.json()),
  
  generateReceipt: (id: string) => {
    const token = localStorage.getItem("admin_token");
    window.open(`${API_BASE}/admin/receipt/${id}?token=${token}`, "_blank");
  },
  
  broadcastSms: (data: any) => fetch(`${API_BASE}/admin/broadcast-sms`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(res => res.json()),
};
