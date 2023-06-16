import React from 'react';
import PaperReview from './PaperReview';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ReviewerDashboard = () => {
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Reviewer Dashboard
        </Typography>
        <Button color="inherit" component={RouterLink} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={RouterLink} to="/propose-reviewer">
          Propose Reviewer
        </Button>
        <Button color="inherit" component={RouterLink} to="/vote-reviewer">
          Vote Reviewer
        </Button>
      </Toolbar>
      <PaperReview />
    </div>
  );
};

export default ReviewerDashboard;
