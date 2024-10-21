// StudyMaterialGenerator
'use client';

import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Paper, Box, Container, Snackbar, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Select, MenuItem, InputLabel } from '@mui/material';
import TeacherLayout from '../TeacherLayout';
import { generateStudyMaterial, generatePowerPoint, getChapters } from '@/app/utils/api';

export default function StudyMaterialGenerator() {
  const [chapters, setChapters] = useState<{ id: number; title: string }[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [materialType, setMaterialType] = useState<string>('summary');
  const [content, setContent] = useState<string>('');
  const [generatedMaterial, setGeneratedMaterial] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
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

    fetchChapters();
  }, []);

  const handleGenerateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setMessage('Generating study material...');
      setOpenSnackbar(true);
      if (materialType === 'powerpoint') {
        const pptBlob = await generatePowerPoint(customTopic || selectedChapter, content);
        const url = window.URL.createObjectURL(pptBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${customTopic || selectedChapter}.pptx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        setMessage('PowerPoint generated and downloaded successfully!');
      } else {
        const result = await generateStudyMaterial(selectedChapter, customTopic, materialType);
        setGeneratedMaterial(result.study_material);
        setMessage('Study material generated successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage(error instanceof Error ? error.message : 'An error occurred while generating study material');
    } finally {
      setOpenSnackbar(true);
    }
  };

  return (
    <TeacherLayout>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Study Material Generator
          </Typography>
          <Box component="form" onSubmit={handleGenerateMaterial} noValidate sx={{ mt: 3 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="chapter-select-label">Chapter</InputLabel>
              <Select
                labelId="chapter-select-label"
                value={selectedChapter}
                label="Chapter"
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
              fullWidth
              label="Custom Topic"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl component="fieldset" sx={{ mb: 2 }}>
              <FormLabel component="legend">Material Type</FormLabel>
              <RadioGroup
                row
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
              >
                <FormControlLabel value="summary" control={<Radio />} label="Summary" />
                <FormControlLabel value="flashcards" control={<Radio />} label="Flashcards" />
                <FormControlLabel value="mindmap" control={<Radio />} label="Mind Map" />
                <FormControlLabel value="powerpoint" control={<Radio />} label="PowerPoint" />
              </RadioGroup>
            </FormControl>
            {materialType === 'powerpoint' && (
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Content (optional)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ mb: 2 }}
              />
            )}
            <Button type="submit" variant="contained" color="primary">
              Generate Study Material
            </Button>
          </Box>
        </Paper>
        {generatedMaterial && materialType !== 'powerpoint' && (
          <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Study Material
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={20}
              value={generatedMaterial}
              InputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />
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
