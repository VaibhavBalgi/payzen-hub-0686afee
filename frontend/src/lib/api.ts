const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005/api';

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
  // Profile
  getProfile: async () => {
    const res = await fetch(`${API_URL}/users/profile`, { headers: getAuthHeaders() });
    return handleResponse(res);
  },
  
  // Support
  escalateTransaction: async (data: any) => {
    const res = await fetch(`${API_URL}/support/escalate`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse(res);
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
  deleteTransaction: async (id: string) => {
    const res = await fetch(`${API_URL}/transactions/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },
  syncTransactions: async () => {
    const res = await fetch(`${API_URL}/transactions/sync`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return handleResponse(res);
  },
  importCSV: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/transactions/import-csv`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData
    });
    return handleResponse(res);
  },

  // Payments / Razorpay
  createRazorpayOrder: async (amount: number) => {
    const res = await fetch(`${API_URL}/payments/create-order`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ amount })
    });
    return handleResponse(res);
  },
  verifyRazorpayPayment: async (paymentData: any) => {
    const res = await fetch(`${API_URL}/payments/verify`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(paymentData)
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
