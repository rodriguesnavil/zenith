import React, { useState, useContext } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
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
    <div>
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
      <Button variant="contained" color="primary" onClick={confirmRole}>Confirm Role</Button>
    </div>
  );
};

export default RoleSelect;
