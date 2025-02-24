import React, { useState } from 'react';
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Rating,
  Box,
  Typography,
  Snackbar,
} from '@mui/material';
import { Feedback as FeedbackIcon } from '@mui/icons-material';

interface FeedbackData {
  rating: number | null;
  comment: string;
  category: string;
  path: string;
}

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: null,
    comment: '',
    category: '',
    path: window.location.pathname,
  });

  const handleSubmit = async () => {
    try {
      // TODO: Implement actual feedback submission to backend
      console.log('Feedback submitted:', feedback);
      setOpen(false);
      setSnackbarOpen(true);
      setFeedback({
        rating: null,
        comment: '',
        category: '',
        path: window.location.pathname,
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="feedback"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setOpen(true)}
      >
        <FeedbackIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Provide Feedback</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography component="legend">How would you rate your experience?</Typography>
            <Rating
              value={feedback.rating}
              onChange={(_, newValue) => {
                setFeedback(prev => ({ ...prev, rating: newValue }));
              }}
            />
          </Box>
          <TextField
            select
            fullWidth
            label="Category"
            value={feedback.category}
            onChange={(e) => setFeedback(prev => ({ ...prev, category: e.target.value }))}
            margin="dense"
            SelectProps={{
              native: true
            }}
          >
            <option value="">Select a category</option>
            <option value="ui">User Interface</option>
            <option value="feature">Feature Request</option>
            <option value="bug">Bug Report</option>
            <option value="other">Other</option>
          </TextField>
          <TextField
            fullWidth
            multiline
            rows={4}
            margin="dense"
            label="Comments"
            value={feedback.comment}
            onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            disabled={!feedback.rating || !feedback.category || !feedback.comment}
            variant="contained"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Thank you for your feedback!"
      />
    </>
  );
}