'use client';

import React, { useState, useEffect } from 'react';
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Container,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import TeacherLayout from '../TeacherLayout';
import { generateLessonPlan, getChapters, exportLessonPlan } from '@/app/utils/api';

interface LessonPlanResponse {
  lesson_plan: string;
}

export default function LessonPlanGenerator() {
  const [chapter, setChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [duration, setDuration] = useState('');
  const [lessonPlan, setLessonPlan] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [chapters, setChapters] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const fetchedChapters = await getChapters();
      setChapters(fetchedChapters);
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapter && !customTopic) {
      setMessage('Please select a chapter or enter a custom topic.');
      setOpenSnackbar(true);
      return;
    }
    try {
      const requestData = {
        chapterName: chapter || undefined,
        customTopic: customTopic || undefined,
        duration: Number(duration),
      };
      console.log('Sending request with data:', JSON.stringify(requestData));
      const response = await generateLessonPlan(requestData);
      console.log('Received response:', JSON.stringify(response));
      setLessonPlan(response.lesson_plan);
      setMessage('Lesson plan generated successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error generating lesson plan:', error);
      setMessage(error instanceof Error ? error.message : 'Failed to generate lesson plan. Please try again.');
      setOpenSnackbar(true);
    }
  };

  const handleExport = async (format: 'docx' | 'pdf') => {
    try {
      if (!lessonPlan) {
        throw new Error('No lesson plan to export');
      }
      console.log('Lesson Plan:', typeof lessonPlan, lessonPlan);
      const response = await exportLessonPlan(lessonPlan, format);
      
      // Check if the response is JSON (error message) or a blob (file)
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
        // It's an error message
        const errorData = await response.json();
        throw new Error(errorData.error || 'Unknown error occurred');
      } else {
        // It's a file
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lesson_plan.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setMessage(`Lesson plan exported as ${format.toUpperCase()} successfully!`);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setMessage(`Failed to export lesson plan as ${format.toUpperCase()}. ${errorMessage}`);
      console.error('Error:', error);
    }
    setOpenSnackbar(true);
  };

  return (
    <TeacherLayout>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Lesson Plan Generator
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="chapter-select-label">Chapter</InputLabel>
              <Select
                labelId="chapter-select-label"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                label="Chapter"
              >
                {chapters.map((chap) => (
                  <MenuItem key={chap.id} value={chap.title}>{chap.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Custom Topic"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Duration (minutes)"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Generate Lesson Plan
            </Button>
          </Box>
        </Paper>
        {lessonPlan && (
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Lesson Plan
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={10}
              value={lessonPlan}
              onChange={(e) => setLessonPlan(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ mt: 2 }}>
              <Button onClick={() => handleExport('docx')} variant="contained" color="secondary" sx={{ mr: 2 }}>
                Export as Word
              </Button>
              <Button onClick={() => handleExport('pdf')} variant="contained" color="secondary">
                Export as PDF
              </Button>
            </Box>
          </Paper>
        )}
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
