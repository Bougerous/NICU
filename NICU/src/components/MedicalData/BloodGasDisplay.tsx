import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip
} from '@mui/material';
import { invoke } from '@tauri-apps/api';

interface BloodGasResult {
  id: number;
  timestamp: string;
  ph: number;
  pco2: number;
  po2: number;
  hco3: number;
  be: number;
  lactate: number;
}

interface BloodGasDisplayProps {
  patientId: number;
}

const BloodGasDisplay: React.FC<BloodGasDisplayProps> = ({ patientId }) => {
  const [results, setResults] = useState<BloodGasResult[]>([]);

  useEffect(() => {
    fetchBloodGasResults();
  }, [patientId]);

  const fetchBloodGasResults = async () => {
    try {
      const data = await invoke('get_blood_gases', { patientId });
      setResults(data as BloodGasResult[]);
    } catch (error) {
      console.error('Error fetching blood gas results:', error);
    }
  };

  const getValueStatus = (param: string, value: number): 'success' | 'warning' | 'error' => {
    const ranges = {
      ph: { normal: [7.35, 7.45], warning: [7.30, 7.50] },
      pco2: { normal: [35, 45], warning: [30, 50] },
      po2: { normal: [80, 100], warning: [60, 120] },
      hco3: { normal: [22, 26], warning: [18, 30] },
      be: { normal: [-2, 2], warning: [-4, 4] },
      lactate: { normal: [0.5, 2.0], warning: [2.0, 4.0] }
    };

    const range = ranges[param as keyof typeof ranges];
    if (!range) return 'warning';

    if (value >= range.normal[0] && value <= range.normal[1]) return 'success';
    if (value >= range.warning[0] && value <= range.warning[1]) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Blood Gas Results
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>pH</TableCell>
              <TableCell>pCO2</TableCell>
              <TableCell>pO2</TableCell>
              <TableCell>HCO3</TableCell>
              <TableCell>BE</TableCell>
              <TableCell>Lactate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result) => (
              <TableRow key={result.id}>
                <TableCell>
                  {new Date(result.timestamp).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={result.ph.toFixed(2)}
                    color={getValueStatus('ph', result.ph)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={result.pco2.toFixed(1)}
                    color={getValueStatus('pco2', result.pco2)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={result.po2.toFixed(1)}
                    color={getValueStatus('po2', result.po2)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={result.hco3.toFixed(1)}
                    color={getValueStatus('hco3', result.hco3)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={result.be.toFixed(1)}
                    color={getValueStatus('be', result.be)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={result.lactate.toFixed(1)}
                    color={getValueStatus('lactate', result.lactate)}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BloodGasDisplay;