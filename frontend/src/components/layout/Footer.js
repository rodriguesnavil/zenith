import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';

const Footer = () => {
  return (
    <footer>
      <Box bgcolor="primary.main" color="primary.contrastText" py={3}>
        <Container maxWidth="sm">
          <Typography variant="body1" align="center">
            Zenith © 2023 | Decentralized Academic Paper Review Platform
          </Typography>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
