// StudyMaterialGenerator
'use client';

import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Box, Container, Snackbar, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TeacherLayout from '../TeacherLayout';
import { generateStudyMaterial, getChapters, shareStudyMaterial } from '@/app/utils/api';

export default function StudyMaterialGenerator() {
  const [chapter, setChapter] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [materialType, setMaterialType] = useState('Summary');
  const [studyMaterial, setStudyMaterial] = useState('');
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
      const response = await generateStudyMaterial(chapter, customTopic, materialType);
      setStudyMaterial(response.study_material);
      setMessage('Study material generated successfully!');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Failed to generate study material. Please try again.');
      setOpenSnackbar(true);
      console.error('Error:', error);
    }
  };

  const handleShare = async () => {
    try {
      const response = await shareStudyMaterial(studyMaterial);
      setMessage(response.message);
      setOpenSnackbar(true);
    } catch (error) {
      setMessage('Failed to share study material. Please try again.');
      setOpenSnackbar(true);
      console.error('Error:', error);
    }
  };

  return (
    <TeacherLayout>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Study Material Generator
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="chapter-select-label">Chapter</InputLabel>
              <Select
                labelId="chapter-select-label"
                value={chapter}
                onChange={(e) => {
                  setChapter(e.target.value);
                  if (e.target.value) setCustomTopic('');
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
                if (e.target.value) setChapter('');
              }}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="material-type-label">Material Type</InputLabel>
              <Select
                labelId="material-type-label"
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                label="Material Type"
              >
                <MenuItem value="Summary">Summary</MenuItem>
                <MenuItem value="Flashcards">Flashcards</MenuItem>
                <MenuItem value="Mind Map">Mind Map</MenuItem>
                <MenuItem value="External Resources">External Resources</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary">
              Generate Study Material
            </Button>
          </Box>
        </Paper>
        {studyMaterial && (
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Study Material
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={20}
              value={studyMaterial}
              onChange={(e) => setStudyMaterial(e.target.value)}
              sx={{ mb: 2, fontFamily: 'monospace' }}
            />
            <Box sx={{ mt: 2 }}>
              <Button onClick={handleShare} variant="contained" color="secondary">
                Share with Students
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
