import { Box, Typography, Paper, Button } from '@mui/material';
import TaskBoard from '../components/Tasks/TaskBoard';

export default function Tasks() {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Tasks</Typography>
        <Button variant="contained" color="primary">
          Add New Task
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <TaskBoard />
      </Paper>
    </Box>
  );
}