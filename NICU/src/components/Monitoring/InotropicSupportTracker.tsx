import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box
} from '@mui/material';
import { invoke } from '@tauri-apps/api';

interface InotropicSupport {
  id: number;
  drug: string;
  dose: number;
  unit: string;
  startTime: string;
  endTime?: string;
}

interface InotropicSupportTrackerProps {
  patientId: number;
}

const InotropicSupportTracker: React.FC<InotropicSupportTrackerProps> = ({ patientId }) => {
  const [supports, setSupports] = useState<InotropicSupport[]>([]);
  const [newSupport, setNewSupport] = useState<Omit<InotropicSupport, 'id'>>({
    drug: '',
    dose: 0,
    unit: 'mcg/kg/min',
    startTime: new Date().toISOString(),
  });

  const drugOptions = [
    { value: 'dopamine', label: 'Dopamine' },
    { value: 'dobutamine', label: 'Dobutamine' },
    { value: 'epinephrine', label: 'Epinephrine' },
    { value: 'norepinephrine', label: 'Norepinephrine' },
    { value: 'milrinone', label: 'Milrinone' }
  ];

  useEffect(() => {
    fetchInotropicSupports();
  }, [patientId]);

  const fetchInotropicSupports = async () => {
    try {
      const data = await invoke('get_inotropic_supports', { patientId });
      setSupports(data as InotropicSupport[]);
    } catch (error) {
      console.error('Error fetching inotropic supports:', error);
    }
  };

  const handleAddSupport = async () => {
    try {
      await invoke('add_inotropic_support', {
        patientId,
        support: newSupport
      });
      fetchInotropicSupports();
      setNewSupport({
        drug: '',
        dose: 0,
        unit: 'mcg/kg/min',
        startTime: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error adding inotropic support:', error);
    }
  };

  const handleStopSupport = async (supportId: number) => {
    try {
      await invoke('stop_inotropic_support', {
        supportId,
        endTime: new Date().toISOString()
      });
      fetchInotropicSupports();
    } catch (error) {
      console.error('Error stopping inotropic support:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Inotropic Support Management
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Drug</InputLabel>
              <Select
                value={newSupport.drug}
                onChange={(e) => setNewSupport({...newSupport, drug: e.target.value})}
              >
                {drugOptions.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Dose"
              type="number"
              value={newSupport.dose}
              onChange={(e) => setNewSupport({...newSupport, dose: Number(e.target.value)})}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Unit</InputLabel>
              <Select
                value={newSupport.unit}
                onChange={(e) => setNewSupport({...newSupport, unit: e.target.value})}
              >
                <MenuItem value="mcg/kg/min">mcg/kg/min</MenuItem>
                <MenuItem value="mg/kg/hr">mg/kg/hr</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddSupport}
              fullWidth
              sx={{ mt: 1 }}
            >
              Add Support
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Drug</TableCell>
              <TableCell>Dose</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Start Time</TableCell>
              <TableCell>End Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {supports.map((support) => (
              <TableRow key={support.id}>
                <TableCell>{support.drug}</TableCell>
                <TableCell>{support.dose}</TableCell>
                <TableCell>{support.unit}</TableCell>
                <TableCell>{new Date(support.startTime).toLocaleString()}</TableCell>
                <TableCell>
                  {support.endTime ? new Date(support.endTime).toLocaleString() : 'Active'}
                </TableCell>
                <TableCell>
                  {!support.endTime && (
                    <Button 
                      variant="outlined" 
                      color="secondary"
                      onClick={() => handleStopSupport(support.id)}
                    >
                      Stop
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InotropicSupportTracker;