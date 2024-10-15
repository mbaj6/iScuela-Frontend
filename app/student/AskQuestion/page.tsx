// student/AskQuestion/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { getChapters, askAnyQuestion } from '../../utils/api';

const AskQuestion: React.FC = () => {
  const [chapters, setChapters] = useState<{ id: number; title: string }[]>([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChapters = async () => {
      const chaptersData = await getChapters();
      setChapters(chaptersData);
    };
    fetchChapters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChapter) {
      alert('Please select a chapter before asking a question.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await askAnyQuestion(selectedChapter, question);
      setAnswer(response.answer);
    } catch (error) {
      console.error('Error asking question:', error);
      setAnswer('An error occurred while processing your question.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ask Any Question</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedChapter}
          onChange={(e) => setSelectedChapter(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        >
          <option value="">Select a chapter</option>
          {chapters.map((chapter) => (
            <option key={chapter.id} value={chapter.title}>
              {chapter.title}
            </option>
          ))}
        </select>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here"
          className="w-full p-2 border rounded mb-4"
          rows={4}
          required
        />
        <button
          type="submit"
          disabled={isLoading || !selectedChapter}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? 'Loading...' : 'Ask Question'}
        </button>
      </form>
      {answer && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Answer:</h2>
          <p className="whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default AskQuestion;
