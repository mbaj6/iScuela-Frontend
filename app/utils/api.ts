"use client";
import { StudyMaterial } from '@/types';
import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
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

interface LessonPlanResponse {
  lesson_plan: string;
}

interface DocumentResponse {
  document_path: string;
}

interface Chapter {
  id: number;
  title: string;
}

interface AskQuestionResponse {
  answer: string;
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

export const getChapters = async (): Promise<{ id: number; title: string }[]> => {
  try {
    const response = await api.get<{ id: number; title: string }[]>('/api/chapters');
    return response.data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return [];
  }
};

export const generateLessonPlan = async (chapter: string, customTopic: string, duration: number): Promise<LessonPlanResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-lesson-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chapter, custom_topic: customTopic, duration }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (typeof data.lesson_plan !== 'string') {
      throw new Error('Unexpected response format');
    }
    return data;
  } catch (error) {
    console.error('Error generating lesson plan:', error);
    throw error;
  }
};

export const generateDocument = async (
  lessonPlan: string,
  docType: 'pdf' | 'word',
  chapterName: string
): Promise<DocumentResponse> => {
  try {
    const response = await api.post<DocumentResponse>('/api/generate-document', {
      lesson_plan: lessonPlan,
      doc_type: docType,
      chapter_name: chapterName,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
};

export const exportLessonPlan = async (lessonPlan: string, format: 'docx' | 'pdf'): Promise<Response> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/export-lesson-plan/${format}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lesson_plan: lessonPlan }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error('Error exporting lesson plan:', error);
    throw error;
  }
};

export const generateQuiz = async (
  params: {
    text?: string;
    chapter?: string;
    customTopic?: string;
    numQuestions?: number;
    gradeLevel?: string;
  }
): Promise<any> => {
  try {
    const response = await api.post('/api/generate-quiz', params);
    return response.data;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
};

export const exportQuiz = async (quizContent: string, format: 'docx' | 'pdf'): Promise<Response> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/export-quiz/${format}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quiz_content: quizContent }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } catch (error) {
    console.error('Error exporting quiz:', error);
    throw error;
  }
};

export const generateStudyMaterial = async (chapter: string, customTopic: string, materialType: string): Promise<{ study_material: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/generate-study-material`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chapter, custom_topic: customTopic, material_type: materialType }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error generating study material:', error);
    throw error;
  }
};

export const shareStudyMaterial = async (studyMaterial: string): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/share-study-material`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ study_material: studyMaterial }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error sharing study material:', error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const login = async (username: string, password: string): Promise<{ access_token: string; role: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    setToken(data.access_token);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const generateLectureNotes = async (file: File | null, videoUrl?: string): Promise<{ notes: string }> => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  } else if (videoUrl) {
    formData.append('video_url', videoUrl);
  }

  const response = await fetch(`${API_BASE_URL}/api/generate-lecture-notes`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const generateMCQs = async (notes: string, numQuestions: number): Promise<{ mcqs: string }> => {
  const response = await fetch(`${API_BASE_URL}/api/generate-mcqs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ notes, num_questions: numQuestions }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const getStudyMaterials = async (): Promise<StudyMaterial[]> => {
  const response = await fetch(`${API_BASE_URL}/api/study-materials`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

// ... any other API functions you need

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const askAnyQuestion = async (chapter: string, question: string): Promise<any> => {
  try {
    const response = await api.post('/api/ask-any-question', { chapter, question });
    return response.data;
  } catch (error) {
    console.error('Error asking question:', error);
    throw error;
  }
};

export const askForGuidance = async (topic: string, question: string): Promise<any> => {
  try {
    const response = await api.post('/api/ask-for-guidance', { topic, question });
    return response.data;
  } catch (error) {
    console.error('Error asking for guidance:', error);
    throw error;
  }
};

export const takeQuiz = async (
  chapter: string,
  customTopic: string,
  numQuestions: number,
  gradeLevel?: string
): Promise<any> => {
  try {
    const response = await api.post('/api/take-quiz', {
      chapter,
      custom_topic: customTopic,
      num_questions: numQuestions,
      grade_level: gradeLevel,
    });
    return response.data;
  } catch (error) {
    console.error('Error taking quiz:', error);
    throw error;
  }
};

interface CustomAxiosError extends Error {
  isAxiosError: boolean;
  response?: {
    data?: any;
    status?: number;
    headers?: Record<string, string>;
  };
  request?: any;
  config?: any;
}

function isAxiosError(error: any): error is CustomAxiosError {
  return error && error.isAxiosError === true;
}

export const uploadLecture = async (data: FormData | { video_url: string }): Promise<any> => {
  try {
    console.log("Uploading lecture with data:", data);
    const response = await api.post('/api/upload-lecture', data, {
      headers: {
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json',
      },
    });
    console.log("Upload response:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error('Error uploading lecture:', error);
    if (isAxiosError(error) && error.response) {
      console.error('Response data:', error.response.data);
      throw new Error(error.response.data.error || 'An error occurred during upload');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
