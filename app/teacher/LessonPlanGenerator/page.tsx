'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Snackbar,
  Container,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import TeacherLayout from '../TeacherLayout';
import { getChapters, generateLessonPlan, generateDocument } from '@/app/utils/api';

export default function LessonPlanGenerator() {
  const [chapters, setChapters] = useState<{ id: number; title: string }[]>([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [duration, setDuration] = useState('');
  const [lessonPlan, setLessonPlan] = useState('');
  const [docType, setDocType] = useState<'pdf' | 'word'>('pdf');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [documentPath, setDocumentPath] = useState('');

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const fetchedChapters = await getChapters();
        setChapters(fetchedChapters);
      } catch (error) {
        console.error('Error fetching chapters:', error);
        setMessage('Failed to fetch chapters. Using default list.');
        setOpenSnackbar(true);
      }
    };

    fetchChapters();
  }, []);

  const handleGenerateLessonPlan = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await generateLessonPlan(
        selectedChapter || null,
        customTopic || null,
        parseInt(duration)
      );
      setLessonPlan(response.lesson_plan);
      setMessage('Lesson plan generated successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error generating lesson plan:', error);
      setMessage('Failed to generate lesson plan. Please check the server logs for more details.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDocument = async () => {
    if (!lessonPlan) {
      setMessage('Please generate a lesson plan first.');
      setOpenSnackbar(true);
      return;
    }
    setLoading(true);
    try {
      const response = await generateDocument(lessonPlan, docType, selectedChapter || customTopic);
      setDocumentPath(response.document_path);
      setMessage(`Document generated successfully! Path: ${response.document_path}`);
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Failed to generate document. Please try again.');
      setOpenSnackbar(true);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherLayout>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Lesson Plan Generator
          </Typography>
          <Box component="form" onSubmit={handleGenerateLessonPlan} noValidate sx={{ mt: 3 }}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="chapter-select-label">Select Chapter</InputLabel>
              <Select
                labelId="chapter-select-label"
                id="chapter-select"
                value={selectedChapter}
                label="Select Chapter"
                onChange={(e) => setSelectedChapter(e.target.value)}
              >
                {chapters.map((chapter) => (
                  <MenuItem key={chapter.id} value={chapter.title}>
                    {chapter.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              fullWidth
              id="custom-topic"
              label="Or Enter Custom Topic"
              name="custom-topic"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="duration"
              label="Duration (minutes)"
              name="duration"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Lesson Plan'}
            </Button>
          </Box>
          {lessonPlan && (
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Generated Lesson Plan:
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                value={lessonPlan}
                variant="outlined"
                InputProps={{ readOnly: true }}
              />
              <FormControl component="fieldset" sx={{ mt: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Document Type
                </Typography>
                <RadioGroup
                  row
                  value={docType}
                  onChange={(e) => setDocType(e.target.value as 'pdf' | 'word')}
                >
                  <FormControlLabel value="pdf" control={<Radio />} label="PDF" />
                  <FormControlLabel value="word" control={<Radio />} label="Word" />
                </RadioGroup>
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                onClick={handleGenerateDocument}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate Document'}
              </Button>
            </Box>
          )}
          {documentPath && (
            <Box mt={4}>
              <Typography variant="body1">
                Document generated: {documentPath}
              </Typography>
            </Box>
          )}
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