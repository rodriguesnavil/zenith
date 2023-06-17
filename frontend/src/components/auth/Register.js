import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/ApiService';
import { UserContext } from '../../contexts/UserContext';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = location.state?.address || '';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const { setRole } = useContext(UserContext); // global state  

  const register = async (event) => {
    event.preventDefault();
    try {
      const response = await registerUser({ firstName, lastName, email, walletAddress: address });
      const hasAuthorRole = response.data.user.role.some(r => r.toLowerCase() === 'author');
      if(hasAuthorRole) {
        setRole('author');
        navigate('/dashboard');
      } else {
        navigate('/role-select');
      }
    } catch (error) {
      console.error('Failed to register user:', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={register}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh" // Full height of the viewport
    >
      <TextField 
        label="First Name" 
        required 
        variant="outlined" 
        margin="normal" 
        value={firstName} 
        onChange={(e) => setFirstName(e.target.value)} 
      />
      <TextField 
        label="Last Name" 
        required 
        variant="outlined" 
        margin="normal" 
        value={lastName} 
        onChange={(e) => setLastName(e.target.value)} 
      />
      <TextField 
        label="Email" 
        type="email" 
        required 
        variant="outlined" 
        margin="normal" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <TextField 
        label="Wallet Address" 
        value={address} 
        disabled 
        variant="outlined" 
        margin="normal" 
      />
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        margin="normal"
      >
        Register
      </Button>
    </Box>
  );
};

export default Register;
