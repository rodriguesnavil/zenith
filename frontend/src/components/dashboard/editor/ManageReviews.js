import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { getAllArticles, getReviewers, assignReviewer, proposeArticle } from '../../../services/ApiService';

const ManageReviews = () => {
  const [articles, setArticles] = useState([]);
  const [reviewers, setReviewers] = useState([]);

  useEffect(() => {
    const fetchArticlesAndReviewers = async () => {
      const [articlesResponse, reviewersResponse] = await Promise.all([getAllArticles(), getReviewers()]);
      setArticles(articlesResponse.data.response);
      setReviewers(reviewersResponse.data.user);
    };

    fetchArticlesAndReviewers();
  }, []);

  const handleAssignReviewer = async (articleId, reviewersWalletAddress) => {
    let payload = {
      articleId: articleId,
      reviewersWalletAddress: reviewersWalletAddress
    };
    const result = await assignReviewer(payload);
    const updatedArticle = result.data.response;
    setArticles(articles.map(a => a._id === updatedArticle._id ? updatedArticle : a));
  };

  const handleProposeArticle = async (articleId) => {
    const result = await proposeArticle(articleId);
    const updatedArticle = result.data.response;
    setArticles(articles.map(a => a._id === updatedArticle._id ? updatedArticle : a));
  };

  return (
    <Box m={3}>
      <Typography variant="h5" gutterBottom>
        Manage Reviews
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Paper</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assign Reviewer</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {articles.map((article) => (
              <TableRow key={article._id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{article.status}</TableCell>
                <TableCell>
                  {article.status === 'SUBMITTED' && (
                    <Select
                      variant="outlined"
                      defaultValue=""
                      onChange={(e) => handleAssignReviewer(article._id, e.target.value)}
                    >
                      <MenuItem value="" disabled>
                        Select Reviewer
                      </MenuItem>
                      {reviewers.map((reviewer) => (
                        <MenuItem key={reviewer._id} value={reviewer.walletAddress}>
                          {reviewer.firstName} {reviewer.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </TableCell>
                <TableCell>
                  {article.status === 'Review Completed' && (
                    <Button color="primary" variant="contained" onClick={() => handleProposeArticle(article._id)}>
                      Propose
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManageReviews;
