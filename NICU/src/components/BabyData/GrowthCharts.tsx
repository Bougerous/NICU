import { Box, Grid, Typography, ToggleButton, ToggleButtonGroup, Tooltip as MuiTooltip } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useState } from 'react';

interface GrowthData {
  age: number;
  weight: number;
  length: number;
  headCircumference: number;
}

interface PercentileData {
  age: number;
  p3: number;
  p10: number;
  p50: number;
  p90: number;
  p97: number;
}

export default function GrowthCharts() {
  const [chartType, setChartType] = useState('weight');

  // TODO: Replace with actual data from backend
  const mockData: GrowthData[] = Array.from({ length: 10 }, (_, i) => ({
    age: i,
    weight: 2500 + Math.random() * 1000,
    length: 45 + Math.random() * 10,
    headCircumference: 32 + Math.random() * 5,
  }));

  // Mock percentile data - replace with actual WHO growth chart data
  const mockPercentiles: Record<string, PercentileData[]> = {
    weight: Array.from({ length: 10 }, (_, i) => ({
      age: i,
      p3: 2000 + i * 150,
      p10: 2200 + i * 160,
      p50: 2500 + i * 170,
      p90: 2800 + i * 180,
      p97: 3000 + i * 190,
    })),
    length: Array.from({ length: 10 }, (_, i) => ({
      age: i,
      p3: 44 + i * 0.8,
      p10: 45 + i * 0.85,
      p50: 46 + i * 0.9,
      p90: 47 + i * 0.95,
      p97: 48 + i * 1,
    })),
    headCircumference: Array.from({ length: 10 }, (_, i) => ({
      age: i,
      p3: 31 + i * 0.3,
      p10: 32 + i * 0.35,
      p50: 33 + i * 0.4,
      p90: 34 + i * 0.45,
      p97: 35 + i * 0.5,
    }))
  };

  const handleChartTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: string | null,
  ) => {
    if (newType !== null) {
      setChartType(newType);
    }
  };

  const getChartConfig = () => {
    switch (chartType) {
      case 'weight':
        return {
          dataKey: 'weight',
          label: 'Weight (g)',
          color: '#2196f3',
        };
      case 'length':
        return {
          dataKey: 'length',
          label: 'Length (cm)',
          color: '#4caf50',
        };
      case 'headCircumference':
        return {
          dataKey: 'headCircumference',
          label: 'Head Circumference (cm)',
          color: '#ff9800',
        };
      default:
        return {
          dataKey: 'weight',
          label: 'Weight (g)',
          color: '#2196f3',
        };
    }
  };

  const config = getChartConfig();
  const percentileData = mockPercentiles[chartType];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Growth Charts</Typography>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            aria-label="growth chart type"
            sx={{ mb: 2 }}
          >
            <ToggleButton value="weight" aria-label="weight">
              Weight
            </ToggleButton>
            <ToggleButton value="length" aria-label="length">
              Length
            </ToggleButton>
            <ToggleButton value="headCircumference" aria-label="head circumference">
              Head Circumference
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sx={{ height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="age" 
                label={{ value: 'Age (days)', position: 'bottom' }}
              />
              <YAxis 
                label={{ 
                  value: config.label, 
                  angle: -90, 
                  position: 'insideLeft' 
                }} 
              />
              <Tooltip />
              
              {/* Percentile reference lines */}
              {percentileData.map((entry, index) => (
                index === 0 && [
                  <ReferenceLine key="p97" y={entry.p97} stroke="#ffd700" strokeDasharray="3 3" label="97th" />,
                  <ReferenceLine key="p90" y={entry.p90} stroke="#ffa500" strokeDasharray="3 3" label="90th" />,
                  <ReferenceLine key="p50" y={entry.p50} stroke="#32cd32" strokeDasharray="3 3" label="50th" />,
                  <ReferenceLine key="p10" y={entry.p10} stroke="#ffa500" strokeDasharray="3 3" label="10th" />,
                  <ReferenceLine key="p3" y={entry.p3} stroke="#ffd700" strokeDasharray="3 3" label="3rd" />
                ]
              ))}

              <Line
                type="monotone"
                dataKey={config.dataKey}
                stroke={config.color}
                dot
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Box>
  );
}