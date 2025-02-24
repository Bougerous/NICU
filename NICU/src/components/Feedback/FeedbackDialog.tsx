import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Rating,
  Typography,
  Alert,
  CircularProgress
} from '@mui/material';
import { invoke } from '@tauri-apps/api';

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
  context?: string;
}

export default function FeedbackDialog({ open, onClose, context }: FeedbackDialogProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!rating || !feedback) {
      setError('Please provide both rating and feedback');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await invoke('submit_feedback', {
        rating,
        feedback,
        anonymous,
        context,
        timestamp: new Date().toISOString()
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        resetForm();
      }, 2000);
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setRating(null);
    setFeedback('');
    setAnonymous(false);
    setSuccess(false);
    setError('');
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      aria-labelledby="feedback-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="feedback-dialog-title">
        Provide Feedback
      </DialogTitle>
      <DialogContent>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Thank you for your feedback!
          </Alert>
        )}
        <Box sx={{ my: 2 }}>
          <Typography component="legend">Rating</Typography>
          <Rating
            value={rating}
            onChange={(_, value) => setRating(value)}
            size="large"
          />
        </Box>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
          }
          label="Submit anonymously"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || success}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}