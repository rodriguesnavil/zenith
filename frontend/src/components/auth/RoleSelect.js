import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Snackbar, Alert, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setUserRole } from '../../helpers/EthereumHelper';
import { UserContext } from '../../contexts/UserContext';
import { getUserByWalletAddress } from '../../services/ApiService';

const RoleSelect = () => {
  const navigate = useNavigate();
  const [role, setRoleLocal] = useState(''); // local state
  const { setRole, address } = useContext(UserContext); // global state 
  const [open, setOpen] = useState(false); // Snackbar visibility
  const [error, setError] = useState(''); // error message

  const handleChange = (event) => {
    setRoleLocal(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const confirmRole = async () => {
    try {
      console.log(`address is  ${address}`)
      const response = await getUserByWalletAddress(address);
      console.log(`response is ${JSON.stringify(response)}`)

      if (response.data.user.role.includes(role.toUpperCase())) {
        setRole(role);
        navigate('/dashboard');
      } else {
        throw new Error(`You have selected an invalid role.`);
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setOpen(true);
    }
  };

  return (
    <Box 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh"
      padding={2}
    >
      <Typography variant="h4" gutterBottom align="center">
        Please Select Your Role
      </Typography>
      <Box maxWidth="500px">
        <Typography variant="body1" gutterBottom align="justify">
          Choose the role that you will be using in this academic publishing process.
        </Typography>
      </Box>
      <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '500px' }}>
        <FormControl fullWidth>
          <InputLabel id="role-select-label">Role</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={role}
            onChange={handleChange}
          >
            <MenuItem value={"author"}>Author</MenuItem>
            <MenuItem value={"reviewer"}>Reviewer</MenuItem>
            <MenuItem value={"editor"}>Editor</MenuItem>
          </Select>
        </FormControl>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={confirmRole} fullWidth>
            Confirm Role
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {error}
            </Alert>
          </Snackbar>

        </Box>
      </Paper>
    </Box>
  );
};

export default RoleSelect;