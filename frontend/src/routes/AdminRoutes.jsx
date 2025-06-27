import React from "react";
import { Route } from "react-router-dom";
import AdminLayout from "../pages/principals/AdminLayout";

import AdminDashboard from "../pages/administrator/Dashboard";
import UserManagement from "../pages/administrator/UserManagement";
import Employees from "../pages/administrator/Employees";
import RoleManagement from "../pages/administrator/RoleManagement";
import CategoriesAndSkills from "../pages/administrator/CategoriesandSkills";
import AllocateResources from "../pages/administrator/AllocateResources";
import AdminHelp from "../pages/administrator/Help";

const AdminRoutes = () => (
  <>
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
  </>
);

export default AdminRoutes;