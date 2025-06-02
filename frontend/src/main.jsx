// src/main.jsx

import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import AdminLayout from './pages/AdminLayout';
// import Login from './pages/Login';
// import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminLayout />
      {/* <Login /> */}
      {/* <App /> */}
    </BrowserRouter>
  </StrictMode>
);
