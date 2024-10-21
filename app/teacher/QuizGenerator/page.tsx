'use client';

import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Box, Container, Snackbar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TeacherLayout from '../TeacherLayout';
import { exportQuiz, generateQuiz, getChapters } from '@/app/utils/api';

// Define minimal types to get started
type Chapter = { id: number; title: string };
type Quiz = any; // We'll refine this later if needed

export default function QuizGenerator() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [numQuestions, setNumQuestions] = useState<string>('5');
  const [gradeLevel, setGradeLevel] = useState<string>('');
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [quizContent, setQuizContent] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      const fetchedChapters = await getChapters();
      setChapters(fetchedChapters);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      setMessage('Failed to fetch chapters');
      setOpenSnackbar(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setMessage('Generating quiz...');
      setOpenSnackbar(true);
      const quizData = await generateQuiz({
        chapter: selectedChapter,
        customTopic,
        numQuestions: parseInt(numQuestions),
        gradeLevel,
      });
      console.log('Received quiz data:', quizData);
      setQuiz(quizData);
      setQuizContent(JSON.stringify(quizData, null, 2));
      setMessage('Quiz generated successfully!');
    } catch (error) {
      console.error('Error:', error);
      setMessage(error instanceof Error ? error.message : 'An error occurred while generating the quiz');
    } finally {
      setOpenSnackbar(true);
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
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
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
            onChange={(e) => setCustomTopic(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Number of Questions"
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Grade Level"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
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