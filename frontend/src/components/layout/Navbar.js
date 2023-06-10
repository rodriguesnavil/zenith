import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Zenith
        </Typography>
        <Button color="inherit">Login with Metamask</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
