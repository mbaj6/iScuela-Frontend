'use client';

import React, { useState } from 'react';
import { api } from '../utils/api';

export default function LessonPlanGenerator() {
  const [chapter, setChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [duration, setDuration] = useState(60);
  const [lessonPlan, setLessonPlan] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await api.generateLessonPlan(chapter, customTopic, duration);
      setLessonPlan(result.lesson_plan);
      setMessage('Lesson plan generated successfully!');
    } catch (error) {
      setMessage('Failed to generate lesson plan. Please try again.');
    }
  };

  return (
    <div>
      <h2>Lesson Plan Generator</h2>
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
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Generate Lesson Plan</button>
      </form>
      {message && <p>{message}</p>}
      {lessonPlan && (
        <div>
          <h3>Generated Lesson Plan:</h3>
          <pre>{lessonPlan}</pre>
        </div>
      )}
    </div>
  );
}