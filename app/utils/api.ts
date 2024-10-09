import axios from 'axios';
import { User } from '@/app/types/user';
export const API_BASE_URL = 'http://localhost:5001';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const api = {
  uploadChapter: async (chapterName: string, chapterContent: string) => {
    try {
      const response = await axiosInstance.post('/api/upload-chapter', { title: chapterName, content: chapterContent });
      return response.data;
    } catch (error) {
      console.error('Error uploading chapter:', error);
      throw error;
    }
  },

  generateLessonPlan: async (chapter: string, customTopic: string, duration: number) => {
    try {
      const response = await axiosInstance.post('/api/generate-lesson-plan', { chapter, custom_topic: customTopic, duration });
      return response.data;
    } catch (error) {
      console.error('Error generating lesson plan:', error);
      throw error;
    }
  },

  generateDocument: async (lessonPlan: string, docType: string, chapterName: string) => {
    try {
      const response = await axiosInstance.post('/api/generate-document', { lesson_plan: lessonPlan, doc_type: docType, chapter_name: chapterName });
      return response.data;
    } catch (error) {
      console.error('Error generating document:', error);
      throw error;
    }
  },

  generateQuiz: async (chapter: string, customTopic: string, numQuestions: number) => {
    try {
      const response = await axiosInstance.post('/api/generate-quiz', { chapter, custom_topic: customTopic, num_questions: numQuestions });
      return response.data;
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw error;
    }
  },

  generateStudyMaterial: async (chapter: string, customTopic: string, materialType: string) => {
    try {
      const response = await axiosInstance.post('/api/generate-study-material', { chapter, custom_topic: customTopic, material_type: materialType });
      return response.data;
    } catch (error) {
      console.error('Error generating study material:', error);
      throw error;
    }
  },

  shareStudyMaterial: async (material: string) => {
    try {
      const response = await axiosInstance.post('/api/share-study-material', { material });
      return response.data;
    } catch (error) {
      console.error('Error sharing study material:', error);
      throw error;
    }
  },
};

interface LoginResponse {
  access_token: string;
  role?: 'teacher' | 'student'; // Make role optional
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post('/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function register(username: string, password: string, userType: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, { username, password, user_type: userType });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function uploadChapter(title: string, content: string) {
  const response = await fetch(`${API_BASE_URL}/api/upload-chapter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });

  if (!response.ok) {
    throw new Error('Failed to upload chapter');
  }

  return response.json();
}

export async function getCourses() {
  const response = await fetch(`${API_BASE_URL}/courses`, {
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) throw new Error('Failed to fetch courses')
  return response.json()
}

export async function getCourseById(id: number) {
  const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) throw new Error('Failed to fetch course')
  return response.json()
}

export async function createStudyMaterial(chapter: string, materialType: string) {
  const response = await fetch(`${API_BASE_URL}/study-materials`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ chapter, material_type: materialType })
  })
  if (!response.ok) throw new Error('Failed to create study material')
  return response.json()
}

export async function createQuiz(chapter: string) {
  const response = await fetch(`${API_BASE_URL}/quizzes`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ chapter })
  })
  if (!response.ok) throw new Error('Failed to create quiz')
  return response.json()
}

export async function getGuidance(chapter: string, question: string) {
  const response = await fetch(`${API_BASE_URL}/guidance`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ chapter, question })
  })
  if (!response.ok) throw new Error('Failed to get guidance')
  return response.json()
}

export async function askQuestion(chapter: string, question: string) {
  const response = await fetch(`${API_BASE_URL}/question`, {
    method: 'POST',
    headers: { 
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ chapter, question })
  })
  if (!response.ok) throw new Error('Failed to ask question')
  return response.json()
}

export async function getUserRole(token: string): Promise<string> {
  try {
    const response = await axios.get(`${API_BASE_URL}/user-role`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.role;
  } catch (error) {
    console.error('Error fetching user role:', error);
    throw error;
  }
}

// Add more API functions as needed to match your backend endpoints
