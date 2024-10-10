'use client';

import React, { useState, FormEvent } from 'react';
import { Typography, TextField, Button, Paper, Box, Container, Snackbar } from '@mui/material';
import TeacherLayout from '../TeacherLayout';
import { initializeChapter } from '@/app/utils/api';

export default function CurriculumManagement() {
  const [chapterName, setChapterName] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await initializeChapter(chapterName, chapterContent);
      setMessage(response.message);
      setOpenSnackbar(true);
      setChapterName('');
      setChapterContent('');
    } catch (error) {
      setMessage('Failed to initialize chapter. Please try again.');
      setOpenSnackbar(true);
      console.error('Error:', error);
    }
  };

  return (
    <TeacherLayout>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Curriculum Management
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="chapterName"
              label="Chapter Name"
              name="chapterName"
              value={chapterName}
              onChange={(e) => setChapterName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="chapterContent"
              label="Chapter Content"
              name="chapterContent"
              multiline
              rows={4}
              value={chapterContent}
              onChange={(e) => setChapterContent(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Upload Chapter
            </Button>
          </Box>
        </Paper>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </TeacherLayout>
  );
}
