import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const VoteReviewer = () => {
  const [proposedReviewers, setProposedReviewers] = useState([]);
  const navigate = useNavigate(); // create a navigate instance

  // Mocking a fetch function to load proposed reviewers
  useEffect(() => {
    const fetchProposedReviewers = async () => {
      const response = {
        success: true,
        reviewers: [
          { id: 1, walletAddress: '0x123...', description: 'IPFS Link 1' },
          { id: 2, walletAddress: '0x456...', description: 'IPFS Link 2' },
          { id: 3, walletAddress: '0x789...', description: 'IPFS Link 3' },
        ],
      };
      
      if (response.success) {
        setProposedReviewers(response.reviewers);
      }
    };
    fetchProposedReviewers();
  }, []);

  const handleVote = (reviewerId, vote) => {
    console.log(`Voted ${vote} for reviewer ${reviewerId}`);
    // add your logic here to handle the vote
  };

  return (
    <Box m={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h5" gutterBottom>
        Vote for Proposed Reviewers
      </Typography>
      <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => navigate('/dashboard')}
      >
          Back to Dashboard
      </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Wallet Address</TableCell>
              <TableCell>Description (IPFS Link)</TableCell>
              <TableCell align="right">Vote</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proposedReviewers.map((reviewer) => (
              <TableRow key={reviewer.id}>
                <TableCell component="th" scope="row">
                  {reviewer.walletAddress}
                </TableCell>
                <TableCell>{reviewer.description}</TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => handleVote(reviewer.id, 'yes')}>
                    Yes
                  </Button>
                  &nbsp;
                  <Button variant="contained" color="secondary" onClick={() => handleVote(reviewer.id, 'no')}>
                    No
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VoteReviewer;