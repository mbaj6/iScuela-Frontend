'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Box, Container, Snackbar, List, ListItem } from '@mui/material';
import TeacherLayout from '../TeacherLayout';
import { initializeChapter, getChapters } from '@/app/utils/api';

export default function CurriculumManagement() {
  const [chapterName, setChapterName] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [chapters, setChapters] = useState<string[]>([]);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const fetchedChapters = await getChapters();
      setChapters(fetchedChapters.map(chapter => chapter.title));
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    // Use type assertion here
    console.log("Form data:");
    for (let [key, value] of Array.from(formData.entries())) {
      console.log(key, value);
    }

    try {
      const response = await initializeChapter(formData);
      setMessage(response.message);
      setOpenSnackbar(true);
      setChapterName('');
      setChapterContent('');
      await fetchChapters();  // Fetch updated chapters after successful upload
    } catch (error) {
      setMessage('Failed to initialize chapter. Please try again.');
      setOpenSnackbar(true);
      console.error('Error initializing chapter:', error);
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
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Uploaded Chapters
          </Typography>
          <List>
            {chapters.map((chapter, index) => (
              <ListItem key={index}>{chapter}</ListItem>
            ))}
          </List>
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
