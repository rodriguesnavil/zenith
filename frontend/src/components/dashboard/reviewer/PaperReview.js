import React, { useState, useEffect, useContext } from 'react';
import { Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TextField } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { getAssignedArticles } from '../../../services/ApiService';
import { UserContext } from '../../../contexts/UserContext';
import { insetComment } from '../../../services/ApiService';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PaperReview = () => {
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [review, setReview] = useState("");
  const { address } = useContext(UserContext);

  useEffect(() => {
    const fetchPapers = async () => {
      const result = await getAssignedArticles(address);
      console.log(`result: ${JSON.stringify(result)}`)
      if (result.success) {
        setPapers(result.data.response);
      }
    };
    fetchPapers();
  }, [address]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const submitReview = async () => {
    let payload = {
      articleId: selectedPaper._id,
      reviewerWalletAddress: address,
      comment: review
    }
    const result = await insetComment(payload);
    if (result.success) {
      alert("Review submitted successfully");
      setSelectedPaper(null);
      setReview("");
    }
  };


  return (
    <Box m={3}>
      <Typography variant="h5" gutterBottom>
        Review Papers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: 'bold'}}>Paper Title</TableCell>
              <TableCell align="right" sx={{fontWeight: 'bold'}}>Review</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {papers.map((paper) => (
              <TableRow key={paper._id}>
                <TableCell component="th" scope="row">
                  {paper.title}
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" onClick={() => setSelectedPaper(paper)}>
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedPaper && (
        <Box mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Reviewing: {selectedPaper.title}
              </Typography>
              <Document
                file={selectedPaper.pdf}
                onLoadSuccess={onDocumentLoadSuccess}
                style={{width: '100%', height: '80vh', overflow: 'auto'}}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                ))}
              </Document>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6" gutterBottom>
                Your Review
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={12}
                variant="outlined"
                value={review}
                onChange={e => setReview(e.target.value)}
              />
              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={submitReview}>
                  Submit Review
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default PaperReview;
