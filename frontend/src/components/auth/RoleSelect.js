import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setUserRole } from '../../helpers/EthereumHelper';

const RoleSelect = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const confirmRole = async () => {
    const success = await setUserRole(role);
    if (success) {
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
