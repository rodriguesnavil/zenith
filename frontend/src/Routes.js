import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Homepage from './components/home/Homepage';
import Login from './components/auth/Login';
import RoleSelect from './components/auth/RoleSelect';

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-select" element={<RoleSelect />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
