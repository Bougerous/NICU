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
  Box,
  Tabs,
  Tab,
  Alert
} from '@mui/material';
import { invoke } from '@tauri-apps/api';

interface VentilatorSettings {
  mode: string;
  peep: number;
  pip: number;
  inspiratoryTime: number;
  rate: number;
  fio2: number;
}

interface CPAPSettings {
  peep: number;
  fio2: number;
  flow: number;
}

interface HFOVSettings {
  map: number;
  amplitude: number;
  frequency: number;
  fio2: number;
}

interface HFNCSettings {
  flow: number;
  fio2: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => (
  <div hidden={value !== index}>
    {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
  </div>
);

interface VentilatorManagementProps {
  patientId: number;
}

const VentilatorManagement: React.FC<VentilatorManagementProps> = ({ patientId }) => {
  const [tabValue, setTabValue] = useState(0);
  const [ventSettings, setVentSettings] = useState<VentilatorSettings>({
    mode: 'SIMV',
    peep: 5,
    pip: 20,
    inspiratoryTime: 0.4,
    rate: 40,
    fio2: 21
  });
  const [cpapSettings, setCPAPSettings] = useState<CPAPSettings>({
    peep: 5,
    fio2: 21,
    flow: 6
  });
  const [hfovSettings, setHFOVSettings] = useState<HFOVSettings>({
    map: 12,
    amplitude: 30,
    frequency: 10,
    fio2: 21
  });
  const [hfncSettings, setHFNCSettings] = useState<HFNCSettings>({
    flow: 6,
    fio2: 21
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleVentSettingsSubmit = async () => {
    try {
      await invoke('update_ventilator_settings', { 
        patientId, 
        settings: ventSettings,
        type: 'conventional'
      });
    } catch (error) {
      console.error('Error updating ventilator settings:', error);
    }
  };

  const handleCPAPSettingsSubmit = async () => {
    try {
      await invoke('update_cpap_settings', { 
        patientId, 
        settings: cpapSettings 
      });
    } catch (error) {
      console.error('Error updating CPAP settings:', error);
    }
  };

  const handleHFOVSettingsSubmit = async () => {
    try {
      await invoke('update_hfov_settings', { 
        patientId, 
        settings: hfovSettings 
      });
    } catch (error) {
      console.error('Error updating HFOV settings:', error);
    }
  };

  const handleHFNCSettingsSubmit = async () => {
    try {
      await invoke('update_hfnc_settings', { 
        patientId, 
        settings: hfncSettings 
      });
    } catch (error) {
      console.error('Error updating HFNC settings:', error);
    }
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Conventional Ventilation" />
          <Tab label="CPAP" />
          <Tab label="HFOV" />
          <Tab label="HFNC" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel>Mode</InputLabel>
              <Select
                value={ventSettings.mode}
                onChange={(e) => setVentSettings({...ventSettings, mode: e.target.value})}
              >
                <MenuItem value="SIMV">SIMV</MenuItem>
                <MenuItem value="A/C">A/C</MenuItem>
                <MenuItem value="PSV">PSV</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="PEEP (cmH2O)"
              type="number"
              value={ventSettings.peep}
              onChange={(e) => setVentSettings({...ventSettings, peep: Number(e.target.value)})}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="PIP (cmH2O)"
              type="number"
              value={ventSettings.pip}
              onChange={(e) => setVentSettings({...ventSettings, pip: Number(e.target.value)})}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleVentSettingsSubmit}>
              Update Ventilator Settings
            </Button>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="PEEP (cmH2O)"
              type="number"
              value={cpapSettings.peep}
              onChange={(e) => setCPAPSettings({...cpapSettings, peep: Number(e.target.value)})}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="FiO2 (%)"
              type="number"
              value={cpapSettings.fio2}
              onChange={(e) => setCPAPSettings({...cpapSettings, fio2: Number(e.target.value)})}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleCPAPSettingsSubmit}>
              Update CPAP Settings
            </Button>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="MAP (cmH2O)"
              type="number"
              value={hfovSettings.map}
              onChange={(e) => setHFOVSettings({...hfovSettings, map: Number(e.target.value)})}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Amplitude (%)"
              type="number"
              value={hfovSettings.amplitude}
              onChange={(e) => setHFOVSettings({...hfovSettings, amplitude: Number(e.target.value)})}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleHFOVSettingsSubmit}>
              Update HFOV Settings
            </Button>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Flow (L/min)"
              type="number"
              value={hfncSettings.flow}
              onChange={(e) => setHFNCSettings({...hfncSettings, flow: Number(e.target.value)})}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="FiO2 (%)"
              type="number"
              value={hfncSettings.fio2}
              onChange={(e) => setHFNCSettings({...hfncSettings, fio2: Number(e.target.value)})}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleHFNCSettingsSubmit}>
              Update HFNC Settings
            </Button>
          </Grid>
        </Grid>
      </TabPanel>
    </Paper>
  );
};

export default VentilatorManagement;