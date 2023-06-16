import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PaperReview = () => {
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [numPages, setNumPages] = useState(null);

  // Mocking a fetch function to load papers
  useEffect(() => {
    const fetchPapers = async () => {
      const response = {
        success: true,
        papers: [
          { id: 1, title: 'Paper 1', pdf: 'https://www.africau.edu/images/default/sample.pdf', assignedDate: '2023-06-15T00:00:00.000Z' },
          { id: 2, title: 'Paper 2', pdf: 'https://www.africau.edu/images/default/sample.pdf', assignedDate: '2023-06-16T00:00:00.000Z' },
          { id: 3, title: 'Paper 3', pdf: 'https://www.africau.edu/images/default/sample.pdf', assignedDate: '2023-06-14T00:00:00.000Z' },
        ],
      };
      
      if (response.success) {
        // sort papers by assigned date in descending order
        const sortedPapers = response.papers.sort((a, b) => new Date(b.assignedDate) - new Date(a.assignedDate));
        setPapers(sortedPapers);
      }
    };
    fetchPapers();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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
              <TableRow key={paper.id}>
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
          <Typography variant="h6" gutterBottom>
            Reviewing: {selectedPaper.title}
          </Typography>
          <Document
            file={selectedPaper.pdf}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
          {/* Your review form should go here */}
        </Box>
      )}
    </Box>
  );
};

export default PaperReview;