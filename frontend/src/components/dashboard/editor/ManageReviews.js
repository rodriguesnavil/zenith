import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Alert } from '@mui/material';
import { getAllArticles, getReviewers, assignReviewer, proposeArticle, queueAndExecuteArticle, publishArticle } from '../../../services/ApiService';

const ManageReviews = () => {
  const [articles, setArticles] = useState([]);
  const [reviewers, setReviewers] = useState([]);
  const [isProposed, setIsProposed] = useState(false);
  const [proposalStatus, setProposalStatus] = useState({});
  const [publishAlert, setPublishAlert] = useState(false);

  useEffect(() => {
    const fetchArticlesAndReviewers = async () => {
      const [articlesResponse, reviewersResponse] = await Promise.all([getAllArticles(), getReviewers()]);
      setArticles(articlesResponse.data.response);
      setReviewers(reviewersResponse.data.user);
    };

    const proposalId = localStorage.getItem('proposalId');
    if (proposalId) {
      setIsProposed(true);
    }

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
    if (result.success) {
      localStorage.setItem('proposalId', result.proposalId);
      setIsProposed(true);
    }
  };

  const handleExecuteArticle = async (articleId, walletAddressArray, articleFilePath) => {
    const result = await queueAndExecuteArticle(articleId, walletAddressArray, articleFilePath);
    console.log(`result ${JSON.stringify(result)}`)
    if (result) {
      setProposalStatus(prev => ({ ...prev, [articleId]: 'publish' }));
    }
  };

  const handlePublishArticle = async (articleId, filePath) => {
    const response = await publishArticle(articleId, filePath);
    if (response.success) {
      setProposalStatus(prev => ({ ...prev, [articleId]: 'success_published' }));
      setPublishAlert(true);
    }
  };

  return (
    <Box m={3}>
      <Typography variant="h5" gutterBottom>
        Manage Reviews
      </Typography>
      <TableContainer>
      {publishAlert && (
        <Alert severity="success">
          Deal has been Published
        </Alert>
      )}
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
                  {article.status === 'Review Completed' && !isProposed && (
                    <Button color="primary" variant="contained" onClick={() => handleProposeArticle(article._id)}>
                      Propose
                    </Button>
                  )}
                  {article.status === 'Review Completed' && isProposed && proposalStatus[article._id] !== 'publish' && (
                    <Button color="primary" variant="contained" onClick={() => handleExecuteArticle(article._id, article.walletAddresses, article.filePath)}>
                      Queue and Execute
                    </Button>
                  )}
                  {proposalStatus[article._id] === 'publish' && (
                    <Button color="primary" variant="contained" onClick={() => handlePublishArticle(article._id, article.filePath)}>
                      Publish
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
