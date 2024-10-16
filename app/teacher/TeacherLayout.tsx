'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import LogoutButton from '@/app/components/LogoutButton';
import { 
  Dashboard as DashboardIcon,
  School as SchoolIcon,
  Book as BookIcon,
  Quiz as QuizIcon,
  Note as NoteIcon,
  // Add more icons as needed
} from '@mui/icons-material';

interface TeacherLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const TeacherLayout: React.FC<TeacherLayoutProps> = ({ children }) => {
  const router = useRouter();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/teacher' },
    { text: 'Curriculum Management', icon: <SchoolIcon />, path: '/teacher/CurriculumManagement' },
    { text: 'Lesson Plan Generator', icon: <BookIcon />, path: '/teacher/LessonPlanGenerator' },
    { text: 'Quiz Generator', icon: <QuizIcon />, path: '/teacher/QuizGenerator' },
    { text: 'Study Material Generator', icon: <NoteIcon />, path: '/teacher/StudyMaterialGenerator' },
    // Add more menu items as needed
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Teacher Dashboard
          </Typography>
          <LogoutButton />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton onClick={() => router.push(item.path)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="lg">
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default TeacherLayout;
