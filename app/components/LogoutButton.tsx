import React from 'react';
import { Button } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
