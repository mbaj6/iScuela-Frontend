'use client';

import React, { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CurriculumIcon from '@mui/icons-material/MenuBook';
import LessonPlanIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import StudyMaterialIcon from '@mui/icons-material/LibraryBooks';
import Link from 'next/link';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/teacher' },
  { text: 'Curriculum Management', icon: <CurriculumIcon />, path: '/teacher/CurriculumManagement' },
  { text: 'Lesson Plan Generator', icon: <LessonPlanIcon />, path: '/teacher/LessonPlanGenerator' },
  { text: 'Quiz Generator', icon: <QuizIcon />, path: '/teacher/QuizGenerator' },
  { text: 'Study Material Generator', icon: <StudyMaterialIcon />, path: '/teacher/StudyMaterialGenerator' },
];

export default function DynamicDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <Link href={item.path} key={item.text} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton component="a">
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </Link>
      ))}
    </List>
  );

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
}
