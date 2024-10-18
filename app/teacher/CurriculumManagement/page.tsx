'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Box, Container, Snackbar, List, ListItem } from '@mui/material';
import TeacherLayout from '../TeacherLayout';
import { getChapters, addChapter } from '@/app/utils/api';

interface Chapter {
  id: number;
  title: string;
}

export default function CurriculumManagement() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterContent, setChapterContent] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const fetchedChapters = await getChapters();
      console.log('Fetched chapters:', fetchedChapters); // Debug log
      setChapters(fetchedChapters);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      setMessage('Failed to fetch chapters');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addChapter(chapterTitle, chapterContent);
      console.log('Add chapter response:', response); // Debug log
      setMessage(response.message);
      setChapters(response.chapters);
      setChapterTitle('');
      setChapterContent('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while adding the chapter');
    }
  };

  const renderChapter = (chapter: Chapter | string) => {
    if (typeof chapter === 'string') {
      return <li key={chapter}>{chapter}</li>;
    }
    return <li key={chapter.id}>{chapter.title}</li>;
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
              id="chapterTitle"
              label="Chapter Title"
              name="chapterTitle"
              value={chapterTitle}
              onChange={(e) => setChapterTitle(e.target.value)}
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
            {chapters.map((chapter) => (
              <ListItem key={chapter.id}>{chapter.title}</ListItem>
            ))}
          </List>
        </Paper>
      </Container>
      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage('')}
        message={message}
      />
    </TeacherLayout>
  );
}
