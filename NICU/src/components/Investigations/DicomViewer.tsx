// Import declarations for libraries without TypeScript definitions
declare module 'cornerstone-web-image-loader';
declare module 'cornerstone-tools';
declare module 'cornerstone-core';

import { useState, useEffect, useRef } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { invoke } from '@tauri-apps/api';
import * as cornerstone from 'cornerstone-core';
import * as cornerstoneWebImageLoader from 'cornerstone-web-image-loader';
import * as cornerstoneTools from 'cornerstone-tools';

interface DicomViewerProps {
  patientId: string;
  studyId?: string;
}

export default function DicomViewer({ patientId, studyId }: DicomViewerProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      cornerstone.enable(elementRef.current);
      cornerstoneWebImageLoader.external.cornerstone = cornerstone;
      cornerstoneTools.external.cornerstone = cornerstone;
      cornerstoneTools.external.cornerstoneMath = cornerstoneTools.math;
      cornerstoneTools.init();
    }

    return () => {
      if (elementRef.current) {
        cornerstone.disable(elementRef.current);
      }
    };
  }, []);

  useEffect(() => {
    loadImage();
  }, [patientId, studyId]);

  const loadImage = async () => {
    if (!elementRef.current) return;

    try {
      setLoading(true);
      const imageData = await invoke('get_dicom_image', { 
        patientId, 
        studyId 
      });

      const image = await cornerstone.loadImage(imageData as string);
      cornerstone.displayImage(elementRef.current, image);

      // Enable tools
      cornerstoneTools.addTool(cornerstoneTools.WwwcTool);
      cornerstoneTools.addTool(cornerstoneTools.ZoomTool);
      cornerstoneTools.addTool(cornerstoneTools.PanTool);
      cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load image');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={400}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">
          {error}
        </Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', minHeight: 400 }}>
      <div 
        ref={elementRef}
        style={{ width: '100%', height: '100%', minHeight: 400 }}
      />
    </Box>
  );
}