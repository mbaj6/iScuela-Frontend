'use client';

import React, { useState, FormEvent } from 'react';
import { registerUser } from '../utils/api';
import { useRouter } from 'next/navigation';
import { TextField, Button, Typography, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'teacher' | 'student'>('student');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await registerUser(username, password, userType);
      setMessage(response.message || 'Registration successful');
      // Redirect to login page after successful registration
      setTimeout(() => router.push('/login'), 2000);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(error instanceof Error ? error.message : 'Registration failed. Please try again.');
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
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="user-type-label">User Type</InputLabel>
        <Select
          labelId="user-type-label"
          id="user-type"
          value={userType}
          label="User Type"
          onChange={(e) => setUserType(e.target.value as 'teacher' | 'student')}
        >
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Register
      </Button>
      {message && (
        <Typography color={message.includes('failed') ? 'error' : 'primary'} align="center">
          {message}
        </Typography>
      )}
    </Box>
  );
}
