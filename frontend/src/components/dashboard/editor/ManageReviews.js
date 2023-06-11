import React, { useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, Box } from '@material-ui/core';

// Mock data for reviews
const mockReviews = [
  { id: 1, paper: 'Paper 1', reviewer: 'Reviewer A', status: 'Pending' },
  { id: 2, paper: 'Paper 2', reviewer: 'Reviewer B', status: 'Approved' },
];

const ManageReviews = () => {
  const [reviews, setReviews] = useState(mockReviews);

  const handleApprove = (id) => {
    // call to the backend or blockchain will go here
    console.log(`Review ${id} approved.`);
  };

  const handleReject = (id) => {
    // call to the backend or blockchain will go here
    console.log(`Review ${id} rejected.`);
  };

  return (
    <Box m={3}>
      <Typography variant="h5" gutterBottom>
        Manage Reviews
      </Typography>
      <Paper>
        <List>
          {reviews.map((review) => (
            <ListItem key={review.id}>
              <ListItemText
                primary={`Paper: ${review.paper}, Reviewer: ${review.reviewer}, Status: ${review.status}`}
              />
              <Button variant="contained" color="primary" onClick={() => handleApprove(review.id)}>
                Approve
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleReject(review.id)}>
                Reject
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ManageReviews;
