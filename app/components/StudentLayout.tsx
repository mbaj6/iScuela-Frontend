'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useRouter } from 'next/navigation';
import LogoutButton from '@/app/components/LogoutButton';
import { 
  Dashboard as DashboardIcon,
  Book as BookIcon,
  Quiz as QuizIcon,
  QuestionAnswer as QuestionIcon,
  NoteAlt as LectureNotesIcon,
  Help as HelpIcon
} from '@mui/icons-material';

interface StudentLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
  const router = useRouter();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/student' },
    { text: 'Study Materials', icon: <BookIcon />, path: '/student/StudyMaterial' },
    { text: 'Take Quiz', icon: <QuizIcon />, path: '/student/TakeQuiz' },
    { text: 'Ask for Guidance', icon: <HelpIcon />, path: '/student/AskForGuidance' },
    { text: 'Ask Any Question', icon: <QuestionIcon />, path: '/student/AskQuestion' },
    { text: 'Lecture Notes', icon: <LectureNotesIcon />, path: '/student/LectureNotes' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student Dashboard
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

export default StudentLayout;

