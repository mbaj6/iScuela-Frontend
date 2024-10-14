'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { withAuth } from '@/app/contexts/AuthContext';
import TeacherLayout from './TeacherLayout';

const TeacherDashboard: React.FC = () => {
  return (
    <TeacherLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Teacher Dashboard
      </Typography>
      {/* Add more dashboard content here */}
    </TeacherLayout>
  );
};

export default withAuth(TeacherDashboard);
