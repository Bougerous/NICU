import React, { useEffect, useState } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Typography,
  Card,
  Grid,
  IconButton
} from '@mui/material';
import { Visibility, Edit } from '@mui/icons-material';
import { invoke } from '@tauri-apps/api';

interface Patient {
  id: number;
  name: string;
  dateOfBirth: string;
  weight: number;
  gestationWeeks: number;
}

const PatientDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await invoke('get_babies');
      setPatients(data as Patient[]);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom sx={{ mt: 3, mb: 4 }}>
        Patient Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Weight (g)</TableCell>
                  <TableCell>Gestation (weeks)</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{new Date(patient.dateOfBirth).toLocaleDateString()}</TableCell>
                    <TableCell>{patient.weight}</TableCell>
                    <TableCell>{patient.gestationWeeks}</TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => {}}>
                        <Visibility />
                      </IconButton>
                      <IconButton color="secondary" onClick={() => {}}>
                        <Edit />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default PatientDashboard;