import React, { useState } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Card, 
  CardContent, 
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Chip
} from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  assignedTo: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: []
  },
  {
    id: 'inProgress',
    title: 'In Progress',
    tasks: []
  },
  {
    id: 'done',
    title: 'Done',
    tasks: []
  }
];

export default function TaskBoard() {
  const [columns, setColumns] = useState(initialColumns);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium',
    assignedTo: ''
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceColumn = columns.find(col => col.id === source.droppableId);
    const destColumn = columns.find(col => col.id === destination.droppableId);

    if (sourceColumn && destColumn) {
      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setColumns(columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: sourceTasks };
        }
        if (col.id === destination.droppableId) {
          return { ...col, tasks: destTasks };
        }
        return col;
      }));
    }
  };

  const handleAddTask = () => {
    if (newTask.title && newTask.priority && newTask.assignedTo) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description || '',
        priority: newTask.priority as 'high' | 'medium' | 'low',
        assignedTo: newTask.assignedTo
      };

      setColumns(columns.map(col => {
        if (col.id === 'todo') {
          return { ...col, tasks: [...col.tasks, task] };
        }
        return col;
      }));

      setOpenDialog(false);
      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        assignedTo: ''
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Task Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Task
        </Button>
      </Box>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container spacing={2}>
          {columns.map(column => (
            <Grid item xs={12} md={4} key={column.id}>
              <Paper sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h6" gutterBottom>{column.title}</Typography>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      sx={{ minHeight: '500px' }}
                    >
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{ mb: 1 }}
                            >
                              <CardContent>
                                <Typography variant="h6">{task.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {task.description}
                                </Typography>
                                <Box sx={{ mt: 1 }}>
                                  <Chip 
                                    label={task.priority}
                                    color={getPriorityColor(task.priority)}
                                    size="small"
                                    sx={{ mr: 1 }}
                                  />
                                  <Chip 
                                    label={task.assignedTo}
                                    variant="outlined"
                                    size="small"
                                  />
                                </Box>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Box>
                  )}
                </Droppable>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <TextField
            select
            margin="dense"
            label="Priority"
            fullWidth
            value={newTask.priority}
            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
            SelectProps={{
              native: true
            }}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </TextField>
          <TextField
            margin="dense"
            label="Assigned To"
            fullWidth
            value={newTask.assignedTo}
            onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}