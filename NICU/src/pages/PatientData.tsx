import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import BabyIdentificationForm from '../components/BabyData/BabyIdentificationForm';
import VitalsDisplay from '../components/BabyData/VitalsDisplay';
import GrowthCharts from '../components/BabyData/GrowthCharts';

export default function PatientData() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Patient Data</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <BabyIdentificationForm />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <VitalsDisplay />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <GrowthCharts />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}