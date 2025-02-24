import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Dialog,
  IconButton,
  Tooltip,
  Grid,
} from '@mui/material';
import {
  ZoomIn,
  ZoomOut,
  RotateLeft,
  RotateRight,
  Close,
} from '@mui/icons-material';

interface Image {
  id: string;
  url: string;
  title: string;
  date: string;
  type: 'X-Ray' | 'Ultrasound' | 'CT' | 'MRI';
  description?: string;
}

// Mock data - replace with actual API calls
const mockImages: Image[] = [
  {
    id: '1',
    url: 'https://via.placeholder.com/500',
    title: 'Chest X-Ray',
    date: '2024-02-24',
    type: 'X-Ray',
    description: 'AP view, good inspiration'
  },
  {
    id: '2',
    url: 'https://via.placeholder.com/500',
    title: 'Head Ultrasound',
    date: '2024-02-23',
    type: 'Ultrasound',
    description: 'Normal ventricular size'
  }
];

export default function ImagingViewer() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotateLeft = () => {
    setRotation(prev => prev - 90);
  };

  const handleRotateRight = () => {
    setRotation(prev => prev + 90);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setZoom(1);
    setRotation(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h6" gutterBottom>Imaging Studies</Typography>
      <Paper sx={{ p: 2 }}>
        <ImageList cols={3} gap={8}>
          {mockImages.map((img) => (
            <ImageListItem 
              key={img.id}
              onClick={() => setSelectedImage(img)}
              sx={{ cursor: 'pointer' }}
            >
              <img
                src={img.url}
                alt={img.title}
                loading="lazy"
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <ImageListItemBar
                title={img.title}
                subtitle={new Date(img.date).toLocaleDateString()}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>

      <Dialog
        open={!!selectedImage}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
      >
        {selectedImage && (
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">{selectedImage.title}</Typography>
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '70vh',
                  overflow: 'hidden'
                }}>
                  <img
                    src={selectedImage.url}
                    alt={selectedImage.title}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      transform: `scale(${zoom}) rotate(${rotation}deg)`,
                      transition: 'transform 0.3s ease'
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Tooltip title="Zoom In">
                  <IconButton onClick={handleZoomIn} disabled={zoom >= 3}>
                    <ZoomIn />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Zoom Out">
                  <IconButton onClick={handleZoomOut} disabled={zoom <= 0.5}>
                    <ZoomOut />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Rotate Left">
                  <IconButton onClick={handleRotateLeft}>
                    <RotateLeft />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Rotate Right">
                  <IconButton onClick={handleRotateRight}>
                    <RotateRight />
                  </IconButton>
                </Tooltip>
              </Grid>
              {selectedImage.description && (
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    {selectedImage.description}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        )}
      </Dialog>
    </Box>
  );
}