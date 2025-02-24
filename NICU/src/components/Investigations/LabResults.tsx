import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';

interface LabResult {
  id: string;
  timestamp: string;
  type: 'CBC' | 'BloodGas' | 'Chemistry';
  values: Record<string, number | string>;
  flags?: Record<string, 'H' | 'L' | 'N'>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Mock data - replace with actual API calls
const mockLabResults: LabResult[] = [
  {
    id: '1',
    timestamp: '2024-02-24T10:00:00',
    type: 'CBC',
    values: {
      'WBC': 10.5,
      'RBC': 4.2,
      'HGB': 13.5,
      'HCT': 40.2,
      'PLT': 250
    },
    flags: {
      'WBC': 'H',
      'HGB': 'N',
      'PLT': 'N'
    }
  },
  {
    id: '2',
    timestamp: '2024-02-24T10:00:00',
    type: 'BloodGas',
    values: {
      'pH': 7.35,
      'pCO2': 40,
      'pO2': 95,
      'HCO3': 24,
      'BE': -2
    },
    flags: {
      'pH': 'L',
      'pCO2': 'N',
      'BE': 'L'
    }
  }
];

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lab-results-tabpanel-${index}`}
      aria-labelledby={`lab-results-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function LabResults() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const getFlagColor = (flag: 'H' | 'L' | 'N' | undefined) => {
    switch (flag) {
      case 'H':
        return 'error';
      case 'L':
        return 'warning';
      default:
        return 'success';
    }
  };

  const renderResultTable = (type: 'CBC' | 'BloodGas' | 'Chemistry') => {
    const results = mockLabResults.filter(result => result.type === type);
    if (results.length === 0) return <Typography>No results found</Typography>;

    const parameters = Object.keys(results[0].values);

    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Parameter</TableCell>
              {results.map(result => (
                <TableCell key={result.id} align="right">
                  {new Date(result.timestamp).toLocaleString()}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {parameters.map(param => (
              <TableRow key={param}>
                <TableCell component="th" scope="row">
                  {param}
                </TableCell>
                {results.map(result => (
                  <TableCell key={`${result.id}-${param}`} align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                      {result.values[param]}
                      {result.flags && result.flags[param] && (
                        <Chip
                          label={result.flags[param]}
                          color={getFlagColor(result.flags[param])}
                          size="small"
                        />
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>Laboratory Results</Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Complete Blood Count" />
          <Tab label="Blood Gas" />
          <Tab label="Chemistry" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        {renderResultTable('CBC')}
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        {renderResultTable('BloodGas')}
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        {renderResultTable('Chemistry')}
      </TabPanel>
    </Box>
  );
}