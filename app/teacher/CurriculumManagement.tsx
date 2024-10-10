'use client';

import React, { useState, FormEvent } from 'react';
import { initializeChapter } from '../utils/api';

export default function CurriculumManagement() {
  const [chapterName, setChapterName] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await initializeChapter(chapterName, chapterContent);
      setMessage(response.message);
      setChapterName('');
      setChapterContent('');
    } catch (error) {
      setMessage('Failed to initialize chapter. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Curriculum Management</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="chapterName">Chapter Name:</label>
          <input
            type="text"
            id="chapterName"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="chapterContent">Chapter Content:</label>
          <textarea
            id="chapterContent"
            value={chapterContent}
            onChange={(e) => setChapterContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Upload Chapter</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
