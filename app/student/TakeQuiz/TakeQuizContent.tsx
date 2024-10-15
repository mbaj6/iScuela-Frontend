"use client";

import React, { useState, useEffect } from 'react';
import { getChapters, takeQuiz } from '../../utils/api';

const TakeQuizContent: React.FC = () => {
  const [chapters, setChapters] = useState<{ id: number; title: string }[]>([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [gradeLevel, setGradeLevel] = useState('');
  const [quizContent, setQuizContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChapters = async () => {
      const chaptersData = await getChapters();
      setChapters(chaptersData);
    };
    fetchChapters();
  }, []);

  const handleStartQuiz = async () => {
    setIsLoading(true);
    try {
      const quizData = await takeQuiz(selectedChapter, customTopic, numQuestions, gradeLevel);
      setQuizContent(quizData.quiz_content);
    } catch (error) {
      console.error('Error starting quiz:', error);
      alert('Failed to start quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Take Quiz</h1>
      {!quizContent ? (
        <div>
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select a chapter</option>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.title}>
                {chapter.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Or enter a custom topic"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            min="1"
            max="10"
            className="w-full p-2 border rounded mb-4"
          />
          <input
            type="text"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
            placeholder="Grade level (optional)"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleStartQuiz}
            disabled={(!selectedChapter && !customTopic) || isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? 'Loading...' : 'Start Quiz'}
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-2">Quiz</h2>
          <pre className="whitespace-pre-wrap">{quizContent}</pre>
        </div>
      )}
    </div>
  );
};

export default TakeQuizContent;

