import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@material-ui/core';

const PaperSubmission = () => {
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // call to the backend or blockchain will go here
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
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Abstract"
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
              />
            </Box>
            <Box mb={2}>
              <input type="file" onChange={handleFileUpload} />
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaperSubmission;
