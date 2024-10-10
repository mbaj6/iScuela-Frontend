'use client';

import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Box } from '@mui/material';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await login(username, password);
      setMessage('Login successful');
      // Redirect based on user type
      if (user.userType === 'teacher') {
        router.push('/teacher');
      } else if (user.userType === 'student') {
        router.push('/student');
      } else {
        setMessage('Login successful, but unable to determine user type');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage(error instanceof Error ? error.message : 'Login failed. Please try again.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Login
      </Button>
      {message && (
        <Typography color={message.includes('failed') ? 'error' : 'primary'} align="center">
          {message}
        </Typography>
      )}
    </Box>
  );
}
