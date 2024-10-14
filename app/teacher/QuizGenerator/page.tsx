'use client';

import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Box, Container, Snackbar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TeacherLayout from '../TeacherLayout';
import { generateQuiz, getChapters, exportQuiz } from '@/app/utils/api';

export default function QuizGenerator() {
  const [chapter, setChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [gradeLevel, setGradeLevel] = useState('');
  const [quizContent, setQuizContent] = useState('');
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
    try {
      const response = await generateQuiz(chapter, customTopic, numQuestions, gradeLevel);
      setQuizContent(response.quiz_content);
      setMessage('Quiz generated successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Failed to generate quiz. Please try again.');
      setOpenSnackbar(true);
      console.error('Error:', error);
    }
  };

  const handleExport = async (format: 'docx' | 'pdf') => {
    try {
      if (!quizContent) {
        throw new Error('No quiz to export');
      }
      const response = await exportQuiz(quizContent, format);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quiz.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setMessage(`Quiz exported as ${format.toUpperCase()} successfully!`);
      setOpenSnackbar(true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setMessage(`Failed to export quiz as ${format.toUpperCase()}. ${errorMessage}`);
      setOpenSnackbar(true);
      console.error('Error:', error);
    }
  };

  return (
    <TeacherLayout>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Quiz Generator
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="chapter-select-label">Chapter</InputLabel>
              <Select
                labelId="chapter-select-label"
                value={chapter}
                onChange={(e) => {
                  setChapter(e.target.value);
                  if (e.target.value) {
                    setCustomTopic('');
                    setGradeLevel('');
                  }
                }}
                label="Chapter"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {chapters.map((chap) => (
                  <MenuItem key={chap.id} value={chap.title}>{chap.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Custom Topic"
              value={customTopic}
              onChange={(e) => {
                setCustomTopic(e.target.value);
                if (e.target.value) {
                  setChapter('');
                }
              }}
              sx={{ mb: 2 }}
            />
            {customTopic && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="grade-select-label">Grade Level</InputLabel>
                <Select
                  labelId="grade-select-label"
                  value={gradeLevel}
                  onChange={(e) => setGradeLevel(e.target.value)}
                  label="Grade Level"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {['Elementary', 'Middle School', 'High School', 'College'].map((grade) => (
                    <MenuItem key={grade} value={grade}>{grade}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <TextField
              fullWidth
              label="Number of Questions"
              type="number"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Generate Quiz
            </Button>
          </Box>
        </Paper>
        {quizContent && (
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Quiz
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={20}
              value={quizContent}
              onChange={(e) => setQuizContent(e.target.value)}
              sx={{ mb: 2, fontFamily: 'monospace' }}
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
