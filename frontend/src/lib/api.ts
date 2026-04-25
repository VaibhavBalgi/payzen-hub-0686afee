const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

const handleResponse = async (res: Response, skipAuthCheck = false) => {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401 && !skipAuthCheck) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    throw new Error(data?.message || data?.error || 'API Error');
  }
  return data;
};

export const api = {
  // Auth
  login: async (credentials: any) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse(res, true);
  },
  register: async (userData: any) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse(res, true);
  },
  
  // Transactions
  getTransactions: async () => {
    const res = await fetch(`${API_URL}/transactions`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },
  getTransactionStats: async () => {
    const res = await fetch(`${API_URL}/transactions/stats`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },
  addTransaction: async (data: any) => {
    const res = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  // Insights / Subscriptions
  getSubscriptions: async () => {
    const res = await fetch(`${API_URL}/insights/subscriptions`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },

  // Notifications
  getNotifications: async () => {
    const res = await fetch(`${API_URL}/notifications`, { headers: getAuthHeaders() });
    return handleResponse(res);
  }
};
