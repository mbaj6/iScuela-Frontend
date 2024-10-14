'use client';

import React, { useState } from 'react';
import { Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { withAuth } from '@/app/contexts/AuthContext';
import StudentLayout from '../StudentLayout';
import { generateLectureNotes, generateMCQs } from '@/app/utils/api';

const LectureNotes: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [mcqs, setMCQs] = useState('');
  const [numMCQs, setNumMCQs] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let generatedNotes;
      if (file) {
        generatedNotes = await generateLectureNotes(file);
      } else if (videoUrl) {
        generatedNotes = await generateLectureNotes(null, videoUrl);
      }
      if (generatedNotes) {
        setNotes(generatedNotes.notes);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating notes:', error);
      setIsLoading(false);
    }
  };

  const handleGenerateMCQs = async () => {
    setIsLoading(true);
    try {
      const generatedMCQs = await generateMCQs(notes, numMCQs);
      setMCQs(generatedMCQs.mcqs);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating MCQs:', error);
      setIsLoading(false);
    }
  };

  return (
    <StudentLayout>
      <Typography variant="h4" gutterBottom>Lecture Notes Generator</Typography>
      <Box mb={2}>
        <input
          accept="audio/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload Audio File
          </Button>
        </label>
        {file && <Typography>{file.name}</Typography>}
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Or enter video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
        Generate Notes
      </Button>
      {isLoading && <CircularProgress />}
      {notes && (
        <Box mt={2}>
          <Typography variant="h5">Generated Notes:</Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Box mt={2}>
            <TextField
              type="number"
              label="Number of MCQs"
              value={numMCQs}
              onChange={(e) => setNumMCQs(parseInt(e.target.value))}
              inputProps={{ min: 1, max: 10 }}
            />
            <Button variant="contained" onClick={handleGenerateMCQs}>
              Generate MCQs
            </Button>
          </Box>
        </Box>
      )}
      {mcqs && (
        <Box mt={2}>
          <Typography variant="h5">Generated MCQs:</Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={mcqs}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
      )}
    </StudentLayout>
  );
};

export default withAuth(LectureNotes);
