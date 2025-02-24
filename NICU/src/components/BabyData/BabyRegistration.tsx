import React, { useState } from 'react';
import { Box, TextField, Button, Paper, Typography, Grid } from '@mui/material';
import { invoke } from '@tauri-apps/api';

interface BabyData {
  name: string;
  dateOfBirth: string;
  weight: number;
  gestationWeeks: number;
  sex: string;
}

const BabyRegistration: React.FC = () => {
  const [babyData, setBabyData] = useState<BabyData>({
    name: '',
    dateOfBirth: '',
    weight: 0,
    gestationWeeks: 0,
    sex: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await invoke('create_baby', { baby: babyData });
      // Handle success (e.g., show notification, reset form)
    } catch (error) {
      console.error('Error creating baby record:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Baby Registration</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Baby Name"
              value={babyData.name}
              onChange={(e) => setBabyData({ ...babyData, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="date"
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              value={babyData.dateOfBirth}
              onChange={(e) => setBabyData({ ...babyData, dateOfBirth: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Weight (g)"
              value={babyData.weight}
              onChange={(e) => setBabyData({ ...babyData, weight: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Gestation (weeks)"
              value={babyData.gestationWeeks}
              onChange={(e) => setBabyData({ ...babyData, gestationWeeks: Number(e.target.value) })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Register Baby
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default BabyRegistration;