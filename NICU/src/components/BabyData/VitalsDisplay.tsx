import { Box, Grid, Paper, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

interface VitalSign {
  time: string;
  value: number;
}

interface VitalsData {
  heartRate: VitalSign[];
  respiratoryRate: VitalSign[];
  bloodPressure: VitalSign[];
  temperature: VitalSign[];
  oxygenSaturation: VitalSign[];
}

export default function VitalsDisplay() {
  const [vitals, setVitals] = useState<VitalsData>({
    heartRate: [],
    respiratoryRate: [],
    bloodPressure: [],
    temperature: [],
    oxygenSaturation: [],
  });

  // TODO: Replace with actual data fetching
  useEffect(() => {
    const mockData = () => ({
      time: new Date().toLocaleTimeString(),
      value: Math.random() * 100,
    });

    const interval = setInterval(() => {
      setVitals(prev => ({
        heartRate: [...prev.heartRate.slice(-10), mockData()],
        respiratoryRate: [...prev.respiratoryRate.slice(-10), mockData()],
        bloodPressure: [...prev.bloodPressure.slice(-10), mockData()],
        temperature: [...prev.temperature.slice(-10), mockData()],
        oxygenSaturation: [...prev.oxygenSaturation.slice(-10), mockData()],
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const VitalChart = ({ data, title, color }: { data: VitalSign[], title: string, color: string }) => (
    <Box sx={{ width: '100%', height: 200, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>{title}</Typography>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke={color} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Real-time Vitals</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <VitalChart data={vitals.heartRate} title="Heart Rate (bpm)" color="#ff0000" />
        </Grid>
        <Grid item xs={12}>
          <VitalChart data={vitals.respiratoryRate} title="Respiratory Rate (bpm)" color="#00ff00" />
        </Grid>
        <Grid item xs={12}>
          <VitalChart data={vitals.bloodPressure} title="Blood Pressure (mmHg)" color="#0000ff" />
        </Grid>
        <Grid item xs={12}>
          <VitalChart data={vitals.temperature} title="Temperature (°C)" color="#ff9900" />
        </Grid>
        <Grid item xs={12}>
          <VitalChart data={vitals.oxygenSaturation} title="O2 Saturation (%)" color="#9900ff" />
        </Grid>
      </Grid>
    </Box>
  );
}