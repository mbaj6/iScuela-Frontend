'use client';

import React, { useState } from 'react';
import { initializeChapter } from '@/app/utils/api';

export default function QuizGenerator() {
  const [chapter, setChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [quizContent, setQuizContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await api.generateQuiz(chapter, customTopic, numQuestions);
      setQuizContent(result.quiz_content);
      setMessage('Quiz generated successfully!');
    } catch (error) {
      setMessage('Failed to generate quiz. Please try again.');
    }
  };

  return (
    <div>
      <h2>Quiz Generator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="chapter">Chapter:</label>
          <input
            type="text"
            id="chapter"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="customTopic">Custom Topic:</label>
          <input
            type="text"
            id="customTopic"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="numQuestions">Number of Questions:</label>
          <input
            type="number"
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Generate Quiz</button>
      </form>
      {message && <p>{message}</p>}
      {quizContent && (
        <div>
          <h3>Generated Quiz:</h3>
          <pre>{quizContent}</pre>
        </div>
      )}
    </div>
  );
}
