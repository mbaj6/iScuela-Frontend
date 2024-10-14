'use client';

import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText, ListItemIcon, Paper, Box } from '@mui/material';
import { Description as DescriptionIcon } from '@mui/icons-material';
import { withAuth } from '@/app/contexts/AuthContext';
import StudentLayout from '../StudentLayout';
import { getStudyMaterials } from '@/app/utils/api';

interface StudyMaterial {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
}

const StudyMaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const fetchedMaterials = await getStudyMaterials();
        setMaterials(fetchedMaterials);
      } catch (error) {
        console.error('Error fetching study materials:', error);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <StudentLayout>
      <Typography variant="h4" gutterBottom>Study Materials</Typography>
      <Paper elevation={3}>
        <List>
          {materials.map((material) => (
            <ListItem key={material.id} button component="a" href={material.fileUrl} target="_blank" rel="noopener noreferrer">
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText 
                primary={material.title} 
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {material.description}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
      {materials.length === 0 && (
        <Box mt={2}>
          <Typography variant="body1">No study materials available at the moment.</Typography>
        </Box>
      )}
    </StudentLayout>
  );
};

export default withAuth(StudyMaterialsPage);

