import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
// import { getAuthorPapers } from '../../helpers/ApiHelper';
import { List, ListItem, ListItemText } from '@mui/material';

const AuthorPapers = () => {
  const [papers, setPapers] = useState([]);
  const { address } = useContext(UserContext);

  useEffect(() => {
    const fetchPapers = async () => {
      // Mock response
      const response = {
        success: true,
        papers: [
          { id: 1, title: 'Paper 1', status: 'Under Review' },
          { id: 2, title: 'Paper 2', status: 'Published' },
          { id: 3, title: 'Paper 3', status: 'Rejected' },
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

  return (
    <List>
      {papers.map(paper => (
        <ListItem key={paper.id}>
          <ListItemText
            primary={paper.title}
            secondary={`Status: ${paper.status}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AuthorPapers;
