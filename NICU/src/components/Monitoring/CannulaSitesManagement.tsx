import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip
} from '@mui/material';
import { invoke } from '@tauri-apps/api';

interface CannulaSite {
  id: number;
  type: string;
  location: string;
  insertionDate: string;
  removalDate?: string;
  notes: string;
  status: 'active' | 'removed' | 'complications';
}

interface CannulaSitesManagementProps {
  patientId: number;
}

const CannulaSitesManagement: React.FC<CannulaSitesManagementProps> = ({ patientId }) => {
  const [sites, setSites] = useState<CannulaSite[]>([]);
  const [newSite, setNewSite] = useState<Omit<CannulaSite, 'id'>>({
    type: '',
    location: '',
    insertionDate: new Date().toISOString(),
    notes: '',
    status: 'active'
  });

  const cannulaTypes = [
    { value: 'peripheral_iv', label: 'Peripheral IV' },
    { value: 'uvc', label: 'UVC' },
    { value: 'uac', label: 'UAC' },
    { value: 'picc', label: 'PICC Line' },
    { value: 'arterial', label: 'Arterial Line' }
  ];

  const locationOptions = {
    peripheral_iv: [
      'Right Hand',
      'Left Hand',
      'Right Foot',
      'Left Foot',
      'Right Arm',
      'Left Arm'
    ],
    uvc: ['Umbilical Vein'],
    uac: ['Umbilical Artery'],
    picc: [
      'Right Basilic',
      'Left Basilic',
      'Right Cephalic',
      'Left Cephalic',
      'Right Saphenous',
      'Left Saphenous'
    ],
    arterial: [
      'Right Radial',
      'Left Radial',
      'Right Posterior Tibial',
      'Left Posterior Tibial'
    ]
  };

  useEffect(() => {
    fetchCannulaSites();
  }, [patientId]);

  const fetchCannulaSites = async () => {
    try {
      const data = await invoke('get_cannula_sites', { patientId });
      setSites(data as CannulaSite[]);
    } catch (error) {
      console.error('Error fetching cannula sites:', error);
    }
  };

  const handleAddSite = async () => {
    try {
      await invoke('add_cannula_site', {
        patientId,
        site: newSite
      });
      fetchCannulaSites();
      setNewSite({
        type: '',
        location: '',
        insertionDate: new Date().toISOString(),
        notes: '',
        status: 'active'
      });
    } catch (error) {
      console.error('Error adding cannula site:', error);
    }
  };

  const handleRemoveSite = async (siteId: number, status: 'removed' | 'complications') => {
    try {
      await invoke('remove_cannula_site', {
        siteId,
        removalDate: new Date().toISOString(),
        status
      });
      fetchCannulaSites();
    } catch (error) {
      console.error('Error removing cannula site:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'removed':
        return 'default';
      case 'complications':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Cannula Sites Management
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={newSite.type}
                onChange={(e) => {
                  setNewSite({
                    ...newSite,
                    type: e.target.value,
                    location: ''
                  });
                }}
              >
                {cannulaTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select
                value={newSite.location}
                onChange={(e) => setNewSite({...newSite, location: e.target.value})}
                disabled={!newSite.type}
              >
                {locationOptions[newSite.type as keyof typeof locationOptions]?.map(location => (
                  <MenuItem key={location} value={location}>
                    {location}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Notes"
              value={newSite.notes}
              onChange={(e) => setNewSite({...newSite, notes: e.target.value})}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddSite}
              fullWidth
              sx={{ mt: 1 }}
            >
              Add Site
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Insertion Date</TableCell>
              <TableCell>Removal Date</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sites.map((site) => (
              <TableRow key={site.id}>
                <TableCell>{site.type}</TableCell>
                <TableCell>{site.location}</TableCell>
                <TableCell>{new Date(site.insertionDate).toLocaleString()}</TableCell>
                <TableCell>
                  {site.removalDate ? new Date(site.removalDate).toLocaleString() : '-'}
                </TableCell>
                <TableCell>{site.notes}</TableCell>
                <TableCell>
                  <Chip 
                    label={site.status}
                    color={getStatusColor(site.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {site.status === 'active' && (
                    <>
                      <Button 
                        variant="outlined"
                        size="small"
                        onClick={() => handleRemoveSite(site.id, 'removed')}
                        sx={{ mr: 1 }}
                      >
                        Remove
                      </Button>
                      <Button 
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleRemoveSite(site.id, 'complications')}
                      >
                        Complications
                      </Button>
                    </>
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

export default CannulaSitesManagement;