import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Tabs,
  Tab,
  Typography,
  Button,
  Stack,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import LabResults from '../components/Investigations/LabResults';
import DicomViewer from '../components/Investigations/DicomViewer';
import InterventionTimeline from '../components/Investigations/InterventionTimeline';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`investigation-tabpanel-${index}`}
      aria-labelledby={`investigation-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

export default function InvestigationsDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  // Mock data for timeline - replace with actual API call
  const mockInterventions = [
    {
      id: '1',
      type: 'X-Ray',
      timestamp: '2024-02-24T09:00:00',
      description: 'Chest X-Ray'
    },
    {
      id: '2',
      type: 'Blood Test',
      timestamp: '2024-02-24T10:00:00',
      description: 'Complete Blood Count'
    },
    {
      id: '3',
      type: 'Ultrasound',
      timestamp: '2024-02-24T11:00:00',
      description: 'Cranial Ultrasound'
    }
  ];

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Investigations & Results</Typography>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            sx={{ mr: 1 }}
          >
            New Lab Order
          </Button>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
          >
            New Imaging Order
          </Button>
        </Box>
      </Stack>

      <Paper sx={{ width: '100%', mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="investigation tabs"
          variant={isSmallScreen ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
        >
          <Tab label="Overview" />
          <Tab label="Laboratory" />
          <Tab label="Imaging" />
          <Tab label="Timeline" />
        </Tabs>

        <TabPanel value={selectedTab} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Recent Lab Results</Typography>
                <LabResults />
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Latest Imaging</Typography>
                <DicomViewer patientId="123" />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>Intervention Timeline</Typography>
                <InterventionTimeline interventions={mockInterventions} />
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={selectedTab} index={1}>
          <Paper sx={{ p: 2 }}>
            <LabResults />
          </Paper>
        </TabPanel>

        <TabPanel value={selectedTab} index={2}>
          <Paper sx={{ p: 2 }}>
            <DicomViewer patientId="123" />
          </Paper>
        </TabPanel>

        <TabPanel value={selectedTab} index={3}>
          <Paper sx={{ p: 2 }}>
            <InterventionTimeline interventions={mockInterventions} />
          </Paper>
        </TabPanel>
      </Paper>
    </Box>
  );
}