import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Login from './pages/Login';
import Recovery from './pages/Recovery';

// Rutas por rol
import AdminRoutes from './routes/AdminRoutes';
import ManagerRoutes from './routes/ManagerRoutes';
import TeamRoutes from './routes/TeamRoutes';
import ClientRoutes from './routes/ClientRoutes';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/recovery" element={<Recovery />} />
        {AdminRoutes()}
        {ManagerRoutes()}
        {TeamRoutes()}
        {ClientRoutes()}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);