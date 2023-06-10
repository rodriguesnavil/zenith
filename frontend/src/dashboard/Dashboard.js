import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import AuthorDashboard from './author/AuthorDashboard';
import ReviewerDashboard from './reviewer/ReviewerDashboard';
import EditorDashboard from './editor/EditorDashboard';


const Dashboard = () => {
    const { role } = useContext(UserContext);
  
    switch (role) {
      case 'author':
        return <AuthorDashboard />;
      case 'reviewer':
        return <ReviewerDashboard />;
      case 'editor':
        return <EditorDashboard />;
      default:
        return <div>Please select a role first.</div>;
    }
};

export default Dashboard;