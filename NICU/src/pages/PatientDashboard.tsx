import React from 'react';
import { Box, Grid, Paper, Tabs, Tab } from '@mui/material';
import GrowthCharts from '../components/BabyData/GrowthCharts';
import VitalsDisplay from '../components/BabyData/VitalsDisplay';
import PatientAnalytics from '../components/Analytics/PatientAnalytics';
import TaskBoard from '../components/Tasks/TaskBoard';

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
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function PatientDashboard() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="patient dashboard tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Overview" />
          <Tab label="Growth Charts" />
          <Tab label="Analytics" />
          <Tab label="Tasks" />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <VitalsDisplay />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <GrowthCharts />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <PatientAnalytics />
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Paper sx={{ p: 2 }}>
          <GrowthCharts />
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <PatientAnalytics />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <TaskBoard />
      </TabPanel>
    </Box>
  );
}