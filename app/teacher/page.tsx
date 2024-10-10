'use client';

import React from 'react';
import { Typography } from '@mui/material';
import TeacherLayout from './TeacherLayout';

export default function TeacherDashboard() {
  return (
    <TeacherLayout>
      <Typography variant="h4" component="h1" gutterBottom>
        Teacher Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the teacher dashboard. Here you can manage your courses and students.
      </Typography>
    </TeacherLayout>
  );
}
