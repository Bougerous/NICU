import { Box, Grid, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';
import PatientStatistics from '../components/Analytics/PatientStatistics';
import TreatmentOutcomes from '../components/Analytics/TreatmentOutcomes';
import ResourceUtilization from '../components/Analytics/ResourceUtilization';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Analytics Dashboard</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="day">Last 24 Hours</MenuItem>
            <MenuItem value="week">Last Week</MenuItem>
            <MenuItem value="month">Last Month</MenuItem>
            <MenuItem value="year">Last Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <PatientStatistics timeRange={timeRange} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <TreatmentOutcomes timeRange={timeRange} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <ResourceUtilization timeRange={timeRange} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}