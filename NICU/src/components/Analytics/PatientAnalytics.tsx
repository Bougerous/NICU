import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockVentilationData = [
  { name: 'CPAP', value: 35 },
  { name: 'HFOV', value: 20 },
  { name: 'HFNC', value: 25 },
  { name: 'Ventilator', value: 20 },
];

const mockWeightGainTrend = Array.from({ length: 7 }, (_, i) => ({
  day: `Day ${i + 1}`,
  averageGain: Math.random() * 30 - 10,
}));

const mockInterventionStats = [
  { name: 'Respiratory', count: 45 },
  { name: 'Cardiac', count: 30 },
  { name: 'Nutritional', count: 25 },
  { name: 'Neurological', count: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function PatientAnalytics() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h5" gutterBottom>Patient Analytics Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Ventilation Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={mockVentilationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {mockVentilationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>Weight Gain Trend</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockWeightGainTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis label={{ value: 'Weight Change (g)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Line type="monotone" dataKey="averageGain" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Intervention Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockInterventionStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}