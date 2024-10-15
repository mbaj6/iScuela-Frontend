'use client';

import React, { useState } from 'react';
import { Typography, TextField, Button, Box, CircularProgress } from '@mui/material';
import { withAuth } from '@/app/contexts/AuthContext';
import StudentLayout from '../../components/StudentLayout';
import { uploadLecture, generateQuiz } from '@/app/utils/api';

const LectureNotes: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [quiz, setQuiz] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response;
      if (file) {
        console.log("Uploading file:", file.name);
        const formData = new FormData();
        formData.append('file', file);
        response = await uploadLecture(formData);
      } else if (videoUrl) {
        console.log("Uploading video URL:", videoUrl);
        const formData = new FormData();
        formData.append('video_url', videoUrl);
        response = await uploadLecture(formData);
      } else {
        throw new Error('No file or video URL provided');
      }
      console.log("Upload response:", response);
      setNotes(response.notes);
    } catch (error) {
      console.error('Error processing lecture:', error);
      if (error instanceof Error) {
        alert(`Failed to process lecture: ${error.message}`);
      } else {
        alert('Failed to process lecture. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    try {
      const response = await generateQuiz({ text: notes });
      setQuiz(response.quiz);
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('Failed to generate quiz. Please try again.');
    } finally {
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
      <Button variant="contained" onClick={handleSubmit} disabled={isLoading || (!file && !videoUrl)}>
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
            <Button variant="contained" onClick={handleGenerateQuiz} disabled={isLoading}>
              Generate Quiz
            </Button>
          </Box>
        </Box>
      )}
      {quiz && (
        <Box mt={2}>
          <Typography variant="h5">Generated Quiz:</Typography>
          <TextField
            fullWidth
            multiline
            rows={10}
            value={quiz}
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
