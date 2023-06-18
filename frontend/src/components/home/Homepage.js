import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '2.8rem',
      fontWeight: 500,
      color: '#3f51b5', // change the color as per your requirement
    },
    body1: {
      fontSize: '1.5rem',
      color: '#616161', // change the color as per your requirement
    },
  },
});

const Homepage = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        padding={3}
      >
        <Typography variant="h1" gutterBottom>
          Welcome to Zenith
        </Typography>
        <Typography variant="body1">
          Decentralizing the academic publishing process...
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Homepage;
