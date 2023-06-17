import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Button, Box, Select, MenuItem } from '@mui/material';
import { getAllArticles, getReviewers, assignReviewer } from '../../../services/ApiService';

const ManageReviews = () => {
  const [articles, setArticles] = useState([]);
  const [reviewers, setReviewers] = useState([]);

  useEffect(() => {
    const fetchArticlesAndReviewers = async () => {
      const [articlesResponse, reviewersResponse] = await Promise.all([getAllArticles(), getReviewers()]);
      setArticles(articlesResponse.data.response);
      setReviewers(reviewersResponse.data.user);
      console.log(`reviewersResponse: ${JSON.stringify(reviewersResponse)}`);
    };

    fetchArticlesAndReviewers();
  }, []);

  const handleAssignReviewer = async (articleId, reviewerId) => {
    const updatedArticle = await assignReviewer(articleId, reviewerId);
    setArticles(articles.map(a => a._id === updatedArticle._id ? updatedArticle : a));
  };

  return (
    <Box m={3}>
      <Typography variant="h5" gutterBottom>
        Manage Reviews
      </Typography>
      <Paper>
        <List>
          {articles.map((article) => (
            <ListItem key={article._id}>
              <ListItemText
                primary={`Paper: ${article.title}, Status: ${article.status}`}
              />
              {article.status === 'SUBMITTED' && (
                <>
                  <Select
                    variant="outlined"
                    value=""
                    onChange={(e) => handleAssignReviewer(article._id, e.target.value)}
                  >
                    <MenuItem value="" disabled>
                      Select Reviewer
                    </MenuItem>
                    {reviewers.map((reviewer) => (
                      <MenuItem key={reviewer._id} value={reviewer._id}>
                        {reviewer.firstName} {reviewer.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ManageReviews;