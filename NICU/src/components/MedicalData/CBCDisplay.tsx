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
  Chip,
  Alert
} from '@mui/material';
import { invoke } from '@tauri-apps/api';

interface CBCResult {
  id: number;
  timestamp: string;
  hemoglobin: number;
  hematocrit: number;
  wbc: number;
  platelets: number;
  neutrophils: number;
  lymphocytes: number;
}

interface CBCDisplayProps {
  patientId: number;
}

const CBCDisplay: React.FC<CBCDisplayProps> = ({ patientId }) => {
  const [results, setResults] = useState<CBCResult[]>([]);

  useEffect(() => {
    fetchCBCResults();
  }, [patientId]);

  const fetchCBCResults = async () => {
    try {
      const data = await invoke('get_cbc_results', { patientId });
      setResults(data as CBCResult[]);
    } catch (error) {
      console.error('Error fetching CBC results:', error);
    }
  };

  const getReferenceRange = (parameter: string): string => {
    const ranges = {
      hemoglobin: '14-20 g/dL',
      hematocrit: '45-65%',
      wbc: '5.0-20.0 K/µL',
      platelets: '150-450 K/µL',
      neutrophils: '40-60%',
      lymphocytes: '20-40%'
    };
    return ranges[parameter as keyof typeof ranges] || '';
  };

  const getValueStatus = (param: string, value: number): 'success' | 'warning' | 'error' => {
    const ranges = {
      hemoglobin: { normal: [14, 20], warning: [12, 22] },
      hematocrit: { normal: [45, 65], warning: [40, 70] },
      wbc: { normal: [5, 20], warning: [3, 25] },
      platelets: { normal: [150, 450], warning: [100, 500] },
      neutrophils: { normal: [40, 60], warning: [30, 70] },
      lymphocytes: { normal: [20, 40], warning: [15, 45] }
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
        CBC Results
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Hemoglobin</TableCell>
              <TableCell>Hematocrit</TableCell>
              <TableCell>WBC</TableCell>
              <TableCell>Platelets</TableCell>
              <TableCell>Neutrophils</TableCell>
              <TableCell>Lymphocytes</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Reference Range</TableCell>
              <TableCell>{getReferenceRange('hemoglobin')}</TableCell>
              <TableCell>{getReferenceRange('hematocrit')}</TableCell>
              <TableCell>{getReferenceRange('wbc')}</TableCell>
              <TableCell>{getReferenceRange('platelets')}</TableCell>
              <TableCell>{getReferenceRange('neutrophils')}</TableCell>
              <TableCell>{getReferenceRange('lymphocytes')}</TableCell>
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
                    label={`${result.hemoglobin.toFixed(1)} g/dL`}
                    color={getValueStatus('hemoglobin', result.hemoglobin)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${result.hematocrit.toFixed(1)}%`}
                    color={getValueStatus('hematocrit', result.hematocrit)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${result.wbc.toFixed(1)} K/µL`}
                    color={getValueStatus('wbc', result.wbc)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${result.platelets} K/µL`}
                    color={getValueStatus('platelets', result.platelets)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${result.neutrophils.toFixed(1)}%`}
                    color={getValueStatus('neutrophils', result.neutrophils)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={`${result.lymphocytes.toFixed(1)}%`}
                    color={getValueStatus('lymphocytes', result.lymphocytes)}
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

export default CBCDisplay;