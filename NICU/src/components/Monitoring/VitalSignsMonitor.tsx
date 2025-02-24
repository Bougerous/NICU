import React, { useState, useEffect } from 'react';
import { 
  Paper, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Box,
  Alert
} from '@mui/material';
import { invoke } from '@tauri-apps/api';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface VitalSigns {
  timestamp: string;
  heartRate: number;
  temperature: number;
  respiratoryRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  oxygenSaturation: number;
}

interface VitalSignsMonitorProps {
  patientId: number;
}

const VitalSignsMonitor: React.FC<VitalSignsMonitorProps> = ({ patientId }) => {
  const [vitals, setVitals] = useState<VitalSigns[]>([]);
  const [latestVitals, setLatestVitals] = useState<VitalSigns | null>(null);

  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const data = await invoke('get_vitals', { patientId });
        setVitals(data as VitalSigns[]);
        if ((data as VitalSigns[]).length > 0) {
          setLatestVitals((data as VitalSigns[])[0]);
        }
      } catch (error) {
        console.error('Error fetching vitals:', error);
      }
    };

    fetchVitals();
    const interval = setInterval(fetchVitals, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [patientId]);

  const VitalCard = ({ title, value, unit, normal, warning, critical }: {
    title: string;
    value: number;
    unit: string;
    normal: [number, number];
    warning: [number, number];
    critical: [number, number];
  }) => {
    const getAlertLevel = (value: number): 'success' | 'warning' | 'error' | undefined => {
      if (value >= normal[0] && value <= normal[1]) return 'success';
      if (value >= warning[0] && value <= warning[1]) return 'warning';
      if (value >= critical[0] && value <= critical[1]) return 'error';
      return undefined;
    };

    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div" color={getAlertLevel(value)}>
            {value} {unit}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Vital Signs Monitor
      </Typography>
      
      <Grid container spacing={3}>
        {latestVitals && (
          <>
            <Grid item xs={12} sm={4}>
              <VitalCard
                title="Heart Rate"
                value={latestVitals.heartRate}
                unit="bpm"
                normal={[60, 100]}
                warning={[50, 120]}
                critical={[40, 150]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <VitalCard
                title="Temperature"
                value={latestVitals.temperature}
                unit="°C"
                normal={[36.5, 37.5]}
                warning={[36, 38]}
                critical={[35, 39]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <VitalCard
                title="Respiratory Rate"
                value={latestVitals.respiratoryRate}
                unit="bpm"
                normal={[12, 20]}
                warning={[10, 25]}
                critical={[8, 30]}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Paper sx={{ p: 2, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Vital Signs Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={vitals}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={(value) => new Date(value).toLocaleTimeString()} 
            />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="heartRate" stroke="#8884d8" name="Heart Rate" />
            <Line type="monotone" dataKey="temperature" stroke="#82ca9d" name="Temperature" />
            <Line type="monotone" dataKey="respiratoryRate" stroke="#ffc658" name="Respiratory Rate" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default VitalSignsMonitor;