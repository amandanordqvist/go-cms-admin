const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

interface ApiError extends Error {
  status?: number;
  code?: string;
}

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Get token from localStorage
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Log request details
  console.log(`🚀 API Request: ${options.method || 'GET'} ${endpoint}`, {
    headers: { ...defaultHeaders, ...options.headers },
    body: options.body ? JSON.parse(options.body as string) : undefined,
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include', // Include cookies in requests
    });

    // Log response details
    console.log(`📥 API Response: ${endpoint}`, {
      status: response.status,
      statusText: response.statusText,
    });

    if (!response.ok) {
      const error: ApiError = new Error('API request failed');
      error.status = response.status;
      const data = await response.json().catch(() => ({}));
      error.code = data.code;
      console.error(`❌ API Error: ${endpoint}`, {
        status: response.status,
        data: data,
      });
      throw error;
    }

    const data = await response.json();
    console.log(`✅ API Success: ${endpoint}`, { data });
    return data as T;
  } catch (error) {
    console.error(`❌ API Error: ${endpoint}`, {
      message: error.message,
      status: error.status,
      code: error.code,
    });
    throw error;
  }
}