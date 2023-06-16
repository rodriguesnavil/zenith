import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProposeReviewer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate(); // create a navigate instance

  const onSubmit = (data) => {
    console.log(data);
    // add your logic here to handle the form data
  };

  return (
    <Box m={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography variant="h5" gutterBottom>
        Propose a Reviewer
      </Typography>
      <Button 
          variant="outlined" 
          color="secondary" 
          onClick={() => navigate('/dashboard')}
        >
          Back to Dashboard
      </Button>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('walletAddress', { required: 'Wallet address is required' })}
          label="Wallet Address"
          variant="outlined"
          fullWidth
          error={!!errors.walletAddress}
          helperText={errors.walletAddress?.message}
          margin="normal"
        />
        <TextField
          {...register('description', { required: 'Description is required' })}
          label="Description (IPFS Link)"
          variant="outlined"
          fullWidth
          error={!!errors.description}
          helperText={errors.description?.message}
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Propose
        </Button>
      </form>
    </Box>
  );
};

export default ProposeReviewer;
