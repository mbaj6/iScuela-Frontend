'use client';

import React, { useState } from 'react';
import { api } from '../utils/api';

export default function StudyMaterialGenerator() {
  const [chapter, setChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [materialType, setMaterialType] = useState('Summary');
  const [studyMaterial, setStudyMaterial] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await api.generateStudyMaterial(chapter, customTopic, materialType);
      setStudyMaterial(result.study_material);
      setMessage('Study material generated successfully!');
    } catch (error) {
      setMessage('Failed to generate study material. Please try again.');
    }
  };

  const handleShare = async () => {
    try {
      const result = await api.shareStudyMaterial(studyMaterial);
      setMessage(result.message);
    } catch (error) {
      setMessage('Failed to share study material. Please try again.');
    }
  };

  return (
    <div>
      <h2>Study Material Generator</h2>
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
          <label htmlFor="materialType">Material Type:</label>
          <select
            id="materialType"
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
          >
            <option value="Summary">Summary</option>
            <option value="Flashcards">Flashcards</option>
            <option value="Mind Map">Mind Map</option>
            <option value="External Resources">External Resources</option>
          </select>
        </div>
        <button type="submit">Generate Study Material</button>
      </form>
      {message && <p>{message}</p>}
      {studyMaterial && (
        <div>
          <h3>Generated Study Material:</h3>
          <pre>{studyMaterial}</pre>
          <button onClick={handleShare}>Share with Students</button>
        </div>
      )}
    </div>
  );
}
