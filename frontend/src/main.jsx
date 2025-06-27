import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Layouts
import AdminLayout from './pages/principals/AdminLayout';
import ManagerLayout from './pages/principals/ManagerLayout';
import TeamMembersLayout from './pages/principals/TeamMembersLayout';
import ClientLayout from './pages/principals/ClientLayout';

// Login
import Login from './pages/Login';

// Admin Pages
import AdminDashboard from './pages/administrator/Dashboard';
import UserManagement from './pages/administrator/UserManagement';
import Employees from './pages/administrator/Employees';
import RoleManagement from './pages/administrator/RoleManagement';
import CategoriesAndSkills from './pages/administrator/CategoriesandSkills';
import AllocateResources from './pages/administrator/AllocateResources';
import AdminHelp from './pages/administrator/Help';

// Project Manager Pages
import ManagerDashboard from './pages/projectManager/Dashboard';
import DocumentsManagementManager from './pages/projectManager/DocumentsManagement';
import GenerateReport from './pages/projectManager/GenerateReport';
import ManagerHelp from './pages/projectManager/Help';
import ProjectManagement from './pages/projectManager/ProjectManagement';
import ResourcesManagement from './pages/projectManager/ResourcesManagement';
import TaskManagement from './pages/projectManager/TaskManagement';
import TeamManagement from './pages/projectManager/TeamManagement';
import TrackingProject from './pages/projectManager/TrackingProject';

// Team Member Pages
import TeamDashboard from './pages/teamMember/Dashboard';
import AssignedProject from './pages/teamMember/AssignedProject';
import AssignedTasks from './pages/teamMember/AssignedTasks';
import TeamHelp from './pages/teamMember/Help';
import DocumentsManagementTeam from './pages/teamMember/DocumentsManagement';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="usermanagement" element={<UserManagement />} />
          <Route path="rolemanagement" element={<RoleManagement />} />
          <Route path="categoriesandskills" element={<CategoriesAndSkills />} />
          <Route path="allocateresources" element={<AllocateResources />} />
          <Route path="help" element={<AdminHelp />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route index element={<ManagerDashboard />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="documents" element={<DocumentsManagementManager />} />
          <Route path="generatereport" element={<GenerateReport />} />
          <Route path="help" element={<ManagerHelp />} />
          <Route path="projectmanagement" element={<ProjectManagement />} />
          <Route path="resourcesmanagement" element={<ResourcesManagement />} />
          <Route path="taskmanagement" element={<TaskManagement />} />
          <Route path="teammanagement" element={<TeamManagement />} />
          <Route path="trackingproject" element={<TrackingProject />} />
        </Route>

        {/* Team Member Routes */}
        <Route path="/team" element={<TeamMembersLayout />}>
          <Route index element={<TeamDashboard />} />
          <Route path="dashboard" element={<TeamDashboard />} />
          <Route path="assignedproject" element={<AssignedProject />} />
          <Route path="assignedtasks" element={<AssignedTasks />} />
          <Route path="documents" element={<DocumentsManagementTeam />} />
          <Route path="help" element={<TeamHelp />} />
        </Route>

        {/* Client Layout (sin rutas hijas aún) */}
        <Route path="/client" element={<ClientLayout />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
