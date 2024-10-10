'use client';

import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import Link from 'next/link';

const DynamicDrawer = dynamic(() => import('../DynamicDrawer'), { ssr: false });

interface TeacherLayoutProps {
  children: ReactNode;
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            iScuela LMS
          </Typography>
          <Typography variant="subtitle1">
            Welcome, Teacher
          </Typography>
        </Toolbar>
      </AppBar>
      <DynamicDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
