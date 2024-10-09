'use client';

import React, { useState } from 'react';
import { api } from '../utils/api';

export default function CurriculumManagement() {
  const [chapterName, setChapterName] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const result = await api.uploadChapter(chapterName, chapterContent);
      setMessage(result.message);
      setChapterName('');
      setChapterContent('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to upload chapter. Please try again.');
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
