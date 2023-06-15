import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Box } from '@mui/system';
import theme from '../../styles/materialUI/Theme';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar />
        <Box flexGrow={1}>{children}</Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
