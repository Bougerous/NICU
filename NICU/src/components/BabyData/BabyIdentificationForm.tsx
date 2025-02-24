import { Box, TextField, Grid, Button } from '@mui/material';
import { useState } from 'react';

export default function BabyIdentificationForm() {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    sex: '',
    gestationalAge: '',
    birthWeight: '',
    motherName: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Submit to backend
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Baby's Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Date of Birth"
            name="dateOfBirth"
            InputLabelProps={{ shrink: true }}
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Sex"
            name="sex"
            select
            SelectProps={{ native: true }}
            value={formData.sex}
            onChange={handleChange}
          >
            <option value=""></option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Gestational Age (weeks)"
            name="gestationalAge"
            type="number"
            value={formData.gestationalAge}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Birth Weight (g)"
            name="birthWeight"
            type="number"
            value={formData.birthWeight}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Mother's Name"
            name="motherName"
            value={formData.motherName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Save Patient Data
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}