import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const mockData = [
  { time: '00:00', heartRate: 120, respRate: 30, temperature: 36.8 },
  { time: '04:00', heartRate: 125, respRate: 32, temperature: 36.9 },
  { time: '08:00', heartRate: 118, respRate: 28, temperature: 37.0 },
  { time: '12:00', heartRate: 122, respRate: 31, temperature: 36.7 },
  { time: '16:00', heartRate: 121, respRate: 29, temperature: 36.8 },
  { time: '20:00', heartRate: 119, respRate: 30, temperature: 36.9 },
];

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Patient Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Vital Signs Trend
            </Typography>
            <LineChart width={800} height={400} data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
              <Line type="monotone" dataKey="respRate" stroke="#82ca9d" name="Respiratory Rate" />
              <Line type="monotone" dataKey="temperature" stroke="#ffc658" name="Temperature" />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;