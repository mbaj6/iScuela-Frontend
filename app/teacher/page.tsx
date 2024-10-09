'use client';

import React, { useState } from 'react';
import CurriculumManagement from './CurriculumManagement';
import LessonPlanGenerator from './LessonPlanGenerator';
import QuizGenerator from './QuizGenerator';
import StudyMaterialGenerator from './StudyMaterialGenerator';

export default function TeacherDashboard() {
  const [activeComponent, setActiveComponent] = useState('curriculum');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'curriculum':
        return <CurriculumManagement />;
      case 'lessonPlan':
        return <LessonPlanGenerator />;
      case 'quiz':
        return <QuizGenerator />;
      case 'studyMaterial':
        return <StudyMaterialGenerator />;
      default:
        return <CurriculumManagement />;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '200px', padding: '20px' }}>
        <h2>Teacher Dashboard</h2>
        <ul>
          <li onClick={() => setActiveComponent('curriculum')}>Curriculum Management</li>
          <li onClick={() => setActiveComponent('lessonPlan')}>Lesson Plan Generator</li>
          <li onClick={() => setActiveComponent('quiz')}>Quiz Generator</li>
          <li onClick={() => setActiveComponent('studyMaterial')}>Study Material Generator</li>
        </ul>
      </div>
      <div style={{ flex: 1, padding: '20px' }}>
        {renderComponent()}
      </div>
    </div>
  );
}
