import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PaperSubmission = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const navigate = useNavigate(); // create a navigate instance

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Upload the file to lighthouse
    // Mint a new NFT with the IPFS hash of the file
    // Add the paper to the blockchain
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
