import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const RoleSelect = () => {
  return (
    <div>
      <h2>Select your role:</h2>
      <ButtonGroup variant="contained" color="primary" aria-label="outlined primary button group">
        <Button>Author</Button>
        <Button>Reviewer</Button>
        <Button>Editor</Button>
      </ButtonGroup>
    </div>
  );
};

export default RoleSelect;
