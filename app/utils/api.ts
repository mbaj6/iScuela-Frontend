import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

interface LoginResponse {
  access_token: string;
  role: 'teacher' | 'student';
  message?: string;
}

interface RegisterResponse {
  message: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface ChapterResponse {
  message: string;
  // Add any other properties that the response includes
}

function handleApiError(error: unknown, defaultMessage: string): never {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const errorResponse = error as ErrorResponse;
    throw new Error(errorResponse.response?.data?.message || defaultMessage);
  }
  throw new Error(defaultMessage);
}

export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/login', { username, password });
    console.log('Full login response:', response);
    console.log('Login response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    handleApiError(error, 'Login failed');
  }
}

export async function registerUser(username: string, password: string, userType: 'teacher' | 'student'): Promise<RegisterResponse> {
  try {
    const response = await api.post<RegisterResponse>('/register', { username, password, user_type: userType });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Registration failed');
  }
}

export const initializeChapter = async (chapterName: string, chapterContent: string): Promise<ChapterResponse> => {
  try {
    const response = await api.post<ChapterResponse>('/api/upload-chapter', { title: chapterName, content: chapterContent });
    return response.data;
  } catch (error) {
    console.error('Error initializing chapter:', error);
    throw error;
  }
};

// ... any other API functions you need
