"use client";

import React, { useState, useEffect } from 'react';
import { getChapters, askForGuidance } from '../../utils/api';

const AskForGuidance: React.FC = () => {
  const [chapters, setChapters] = useState<{ id: number; title: string }[]>([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [guidance, setGuidance] = useState('');
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
    setIsLoading(true);
    try {
      const topic = selectedChapter || customTopic;
      const response = await askForGuidance(topic, question);
      setGuidance(response.guidance);
    } catch (error) {
      console.error('Error asking for guidance:', error);
      alert('Failed to get guidance. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ask for Guidance</h1>
      <form onSubmit={handleSubmit}>
        <select
          value={selectedChapter}
          onChange={(e) => {
            setSelectedChapter(e.target.value);
            if (e.target.value) setCustomTopic('');
          }}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="">Select a chapter (optional)</option>
          {chapters.map((chapter) => (
            <option key={chapter.id} value={chapter.title}>
              {chapter.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={customTopic}
          onChange={(e) => {
            setCustomTopic(e.target.value);
            if (e.target.value) setSelectedChapter('');
          }}
          placeholder="Or enter a custom topic"
          className="w-full p-2 border rounded mb-4"
        />
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
          disabled={isLoading || (!selectedChapter && !customTopic)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isLoading ? 'Loading...' : 'Ask for Guidance'}
        </button>
      </form>
      {guidance && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Guidance:</h2>
          <p className="whitespace-pre-wrap">{guidance}</p>
        </div>
      )}
    </div>
  );
};

export default AskForGuidance;
