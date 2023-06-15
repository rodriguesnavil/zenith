import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../contexts/UserContext';
// import { getAuthorPapers } from '../../helpers/ApiHelper';
import { List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

const AuthorPapers = () => {
  const navigate = useNavigate();
  const [papers, setPapers] = useState([]);
  const { address } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchPapers = async () => {
      // Mock response
      const response = {
        success: true,
        papers: [
          { id: 1, title: 'Paper 1', status: 'Review in Progress' },
          { id: 2, title: 'Paper 2', status: 'Revision Requested', reviewComments: 'Revise the abstract.' },
          { id: 3, title: 'Paper 3', status: 'Published' },
          { id: 4, title: 'Paper 4', status: 'Rejected' },
        ],
      };

      // Uncomment below when you integrate with backend
      // const response = await getAuthorPapers(address);

      if (response.success) {
        setPapers(response.papers);
      } else {
        alert('Failed to fetch papers. Please refresh the page.');
      }
    };

    fetchPapers();
  }, [address]);

  const handleRevise = (paper) => {
    setSelectedPaper(paper);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPaper(null);
  };

  const handleNewPaper = () => {
    navigate('/submit-paper');
  };

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // call to the backend or blockchain will go here
    // After successful submission, close the dialog
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleNewPaper}>Submit New Paper</Button>
      <List>
        {papers.map((paper) => (
          <ListItem key={paper.id}>
            <ListItemText primary={paper.title} secondary={`Status: ${paper.status}`} />
            {paper.status === 'Revision Requested' && (
              <Button onClick={() => handleRevise(paper)}>Revise</Button>
            )}
          </ListItem>
        ))}
      </List>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Revision Requested</DialogTitle>
        <DialogContent>
        <DialogContentText>{selectedPaper?.reviewComments}</DialogContentText>
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileUpload} />
            <Button type="submit" color="primary">Submit Revised Paper</Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AuthorPapers;
