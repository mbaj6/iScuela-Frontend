'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { withAuth } from '@/app/contexts/AuthContext';
import StudentLayout from '../components/StudentLayout';

const StudentDashboard: React.FC = () => {
  return (
    <StudentLayout>
      <Typography variant="h4" gutterBottom>Welcome to Your Student Dashboard</Typography>
      {/* Add more dashboard content here */}
    </StudentLayout>
  );
};

export default withAuth(StudentDashboard);
