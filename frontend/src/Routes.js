import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Homepage from './components/home/Homepage';
import Login from './components/auth/Login';
import RoleSelect from './components/auth/RoleSelect';
import Dashboard from './components/dashboard/Dashboard';
import PurchasePaper from './components/purchase/PurchasePaper';
import Reader from './components/purchase/Reader';

const AppRoutes = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-select" element={<RoleSelect />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/purchase" element={<PurchasePaper />} />
          <Route path="/read/:paperId" element={<Reader />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
