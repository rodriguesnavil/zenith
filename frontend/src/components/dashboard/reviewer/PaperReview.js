import React, { useState } from 'react';
import { Paper, Typography, TextField, Button, Box } from '@mui/material';

const PaperReview = () => {
  const [review, setReview] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // call to the backend or blockchain will go here
  };

  return (
    <Box m={3}>
      <Typography variant="h5" gutterBottom>
        Review Paper
      </Typography>
      <Paper>
        <Box p={3}>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </Box>
            <Button variant="contained" color="primary" type="submit">
              Submit Review
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default PaperReview;
