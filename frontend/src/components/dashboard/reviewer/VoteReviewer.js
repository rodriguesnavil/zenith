import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getProposalsWithVotingStatus, castVote } from '../../../services/ApiService';

const VoteReviewer = () => {
  const [proposedReviewers, setProposedReviewers] = useState([]);
  const [voteReasons, setVoteReasons] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProposals = async () => {
      const response = await getProposalsWithVotingStatus();
      if (response.success) {
        setProposedReviewers(response.data.response);
      }
    };
    fetchProposals();
  }, []);

  const handleVote = async (reviewerId, vote) => {
    let payload = {
      proposalId: reviewerId,
      voteWay: vote ? 1 : 0,
      reason: voteReasons[reviewerId]
    };
    const result = await castVote(payload);
    console.log(`Vote ${vote} for reviewer ${reviewerId}. Result: ${JSON.stringify(result)}`);
    // update the state if necessary
  };

  const handleVoteReasonChange = (proposalId, reason) => {
    setVoteReasons(prevState => ({ ...prevState, [proposalId]: reason }));
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
              <TableCell>Proposal ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Vote</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {proposedReviewers.map((reviewer) => (
              <TableRow key={reviewer._id}>
                <TableCell component="th" scope="row">
                  {reviewer.proposalId}
                </TableCell>
                <TableCell>{reviewer.proposalDescription}</TableCell>
                <TableCell align="right">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="voteReason"
                    label="Reason for Vote"
                    name="voteReason"
                    autoComplete="voteReason"
                    autoFocus
                    value={voteReasons[reviewer.proposalId] || ''}
                    onChange={(e) => handleVoteReasonChange(reviewer.proposalId, e.target.value)}
                  />
                  <Button variant="contained" color="primary" onClick={() => handleVote(reviewer.proposalId, 1)}>
                    Yes
                  </Button>
                  &nbsp;
                  <Button variant="contained" color="secondary" onClick={() => handleVote(reviewer.proposalId, 0)}>
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
