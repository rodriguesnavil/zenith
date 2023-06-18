import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Typography, Box, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setUserRole } from '../../helpers/EthereumHelper';
import { UserContext } from '../../contexts/UserContext';

const RoleSelect = () => {
  const navigate = useNavigate();
  const [role, setRoleLocal] = useState(''); // local state
  const { setRole } = useContext(UserContext); // global state  

  const handleChange = (event) => {
    setRoleLocal(event.target.value);
  };

  const confirmRole = async () => {
    const success = await setUserRole(role);
    if (success) {
      setRole(role);
      navigate('/dashboard');
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
        </Box>
      </Paper>
    </Box>
  );
};

export default RoleSelect;
