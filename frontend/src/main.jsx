import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import AdminLayout from './pages/principals/AdminLayout';
import ManagerLayout from './pages/principals/ManagerLayout';
import TeamMembersLayout from './pages/principals/TeamMembersLayout';
import ClientLayout from './pages/principals/ClientLayout';
import Login from './pages/Login';

import Dashboard from './pages/administrator/Dashboard';
import UserManagement from './pages/administrator/UserManagement';
import Employees from './pages/administrator/Employees';
import RoleManagement from './pages/administrator/RoleManagement';
import CategoriesandSkills from './pages/administrator/CategoriesandSkills';
import AllocateResources from './pages/administrator/AllocateResources';
import Help from './pages/administrator/Help';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Rutas Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="rolemanagement" element={<RoleManagement />} />
          <Route path="categoriesandskills" element={<CategoriesandSkills />} />
          <Route path="allocateresources" element={<AllocateResources />} />
          <Route path="help" element={<Help />} />
        </Route>

        {/* Otros layouts */}
        <Route path="/manager" element={<ManagerLayout />} />
        <Route path="/team" element={<TeamMembersLayout />} />
        <Route path="/client" element={<ClientLayout />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);