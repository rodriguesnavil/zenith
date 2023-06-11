import React, { useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, Box } from '@material-ui/core';

// Mock data for papers
const mockPapers = [
  { id: 1, title: 'Paper 1', author: 'Author A', price: 10 },
  { id: 2, title: 'Paper 2', author: 'Author B', price: 20 },
];

const PurchasePaper = () => {
  const [papers, setPapers] = useState(mockPapers);

  const handlePurchase = (id) => {
    // Purchase logic will go here, possibly involving a call to the backend or blockchain
    console.log(`Paper ${id} purchased.`);
  };

  return (
    <Box m={3}>
      <Typography variant="h5" gutterBottom>
        Purchase Papers
      </Typography>
      <Paper>
        <List>
          {papers.map((paper) => (
            <ListItem key={paper.id}>
              <ListItemText
                primary={`Title: ${paper.title}, Author: ${paper.author}, Price: ${paper.price} ZEN`}
              />
              <Button variant="contained" color="primary" onClick={() => handlePurchase(paper.id)}>
                Purchase
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default PurchasePaper;
