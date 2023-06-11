import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

const Reader = () => {
  const { paperId } = useParams();

  // Fetch the paper file from IPFS/Filecoin using the paperId
  // The actual implementation will depend on your IPFS/Filecoin setup
  const paperFile = 'Mock paper content';

  return (
    <Box m={3}>
      <Typography variant="h5" gutterBottom>
        Paper {paperId}
      </Typography>
      <Typography variant="body1">
        {paperFile}
      </Typography>
    </Box>
  );
};

export default Reader;
