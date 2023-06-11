import React from 'react';
import PaperSubmission from './PaperSubmission';
import AuthorPapers from './AuthorPapers';

const AuthorDashboard = () => {
  return (
    <div>
      <h1>Author Dashboard</h1>
      <PaperSubmission />
      <AuthorPapers />
    </div>
  );
};

export default AuthorDashboard;
