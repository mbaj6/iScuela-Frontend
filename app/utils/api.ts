import axios from 'axios';

export const API_BASE_URL = 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const register = async (username: string, password: string, userType: string) => {
  try {
    const response = await api.post('/register', { username, password, user_type: userType });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Add other API calls here as needed
export const initializeChapter = async (chapterName: string, chapterContent: string) => {
  try {
    const response = await api.post('/api/upload-chapter', { title: chapterName, content: chapterContent });
    return response.data;
  } catch (error) {
    console.error('Error initializing chapter:', error);
    throw error;
  }
};

// ... any other API functions you need
