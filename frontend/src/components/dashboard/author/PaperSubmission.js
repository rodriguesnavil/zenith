import React, { useState, useContext } from 'react';
import { Paper, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { submitPaper } from '../../../services/ApiService';
import { UserContext } from '../../../contexts/UserContext';

const PaperSubmission = () => {
  const { address } = useContext(UserContext);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const navigate = useNavigate(); // create a navigate instance

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  console.log(`address: ${address}`)
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);
      formData.append('walletAddresses', address); // Fetch walletAddress from the user context

      const response = await submitPaper(formData); // Send form data object to the API service

      if (response.success) {
        // handle successful submission here...
        // navigate or display a success message
      }
    } catch (error) {
      console.error('Failed to submit paper:', error);
    }
  };

  return (
    <Box m={3}>
      <Typography variant="h5" gutterBottom>
        Submit Your Paper
      </Typography>
      <Paper>
        <Box p={3}>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <input type="file" onChange={handleFileUpload} />
            </Box>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => navigate('/dashboard')} 
                >
                  Back to Dashboard
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaperSubmission;
