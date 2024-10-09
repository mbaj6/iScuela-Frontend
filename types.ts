export interface Course {
  id: number;
  name: string;
  content: string;
  // Add any other properties that a course might have
}

export interface StudyMaterial {
  id: number;
  title: string;
  content: string;
  materialType: string;
  // Add any other properties that study material might have
}

export interface Quiz {
  id: number;
  title: string;
  questions: QuizQuestion[];
  // Add any other properties that a quiz might have
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}
