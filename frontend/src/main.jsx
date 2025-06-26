import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import AdminLayout from './pages/principals/AdminLayout';
import ManagerLayout from './pages/principals/ManagerLayout';
import TeamMembersLayout from './pages/principals/TeamMembersLayout';
// import ClientLayout from './pages/principals/ClientLayout';
import Login from './pages/Login';
// import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

    {/* <Login /> */}
      {/* <ClientLayout /> /}
      {/<TeamMembersLayout />
      
      {/*  <AdminLayout />
      {/* <App /> */}
      <ManagerLayout />
    </BrowserRouter>
  </StrictMode>
);