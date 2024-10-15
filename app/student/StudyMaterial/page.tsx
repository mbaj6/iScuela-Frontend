// student/StudyMaterials/page.tsx
"use client"; 
import React, { useState, useEffect } from 'react';
import { getChapters, generateStudyMaterial } from '../../utils/api';


const StudyMaterials: React.FC = () => {
  const [chapters, setChapters] = useState<{ id: number; title: string }[]>([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [materialType, setMaterialType] = useState('Summary');
  const [studyMaterial, setStudyMaterial] = useState('');
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
      const response = await generateStudyMaterial(selectedChapter, customTopic, materialType);
      setStudyMaterial(response.study_material);
    } catch (error) {
      console.error('Error generating study material:', error);
      setStudyMaterial('An error occurred while generating study material.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Study Materials</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="chapter" className="block mb-2">Select Chapter</label>
          <select
            id="chapter"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a chapter</option>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.title}>
                {chapter.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="customTopic" className="block mb-2">Custom Topic (Optional)</label>
          <input
            type="text"
            id="customTopic"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="materialType" className="block mb-2">Material Type</label>
          <select
            id="materialType"
            value={materialType}
            onChange={(e) => setMaterialType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Summary">Summary</option>
            <option value="Flashcards">Flashcards</option>
            <option value="Mind Map">Mind Map</option>
            <option value="External Resources">External Resources</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Study Material'}
        </button>
      </form>
      {studyMaterial && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Study Material:</h2>
          <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{studyMaterial}</pre>
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;



