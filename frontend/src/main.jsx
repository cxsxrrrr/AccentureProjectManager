<<<<<<< HEAD
=======
// src/main.jsx

>>>>>>> 5d62941 (Revert "ss")
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

<<<<<<< HEAD
import AdminLayout from './pages/principals/AdminLayout';
import ManagerLayout from './pages/principals/ManagerLayout';
import TeamMembersLayout from './pages/principals/TeamMembersLayout';
import ClientLayout from './pages/principals/ClientLayout';
//import Login from './pages/principals/Login';
// import App from './App';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClientLayout />
      {/*<TeamMembersLayout />
      <ManagerLayout />
=======
import AdminLayout from './pages/AdminLayout';
// import Login from './pages/Login';
// import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
>>>>>>> 5d62941 (Revert "ss")
      <AdminLayout />
      {/* <Login /> */}
      {/* <App /> */}
    </BrowserRouter>
  </StrictMode>
);
