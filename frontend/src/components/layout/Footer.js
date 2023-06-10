import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="sm">
        <Typography variant="body1">My sticky footer can be found here.</Typography>
      </Container>
    </footer>
  );
};

export default Footer;
