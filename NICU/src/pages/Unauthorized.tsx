import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      gap={2}
    >
      <Typography variant="h4" component="h1">
        Access Denied
      </Typography>
      <Typography variant="body1" color="text.secondary">
        You don't have permission to access this page.
      </Typography>
      <Button 
        variant="contained" 
        onClick={() => navigate('/')}
      >
        Return to Dashboard
      </Button>
    </Box>
  );
}