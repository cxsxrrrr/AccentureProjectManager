import React from "react";
import { Route } from "react-router-dom";
import TeamMembersLayout from "../pages/principals/TeamMembersLayout";

import TeamDashboard from "../pages/teamMember/Dashboard";
import AssignedProject from "../pages/teamMember/AssignedProject";
import AssignedTasks from "../pages/teamMember/AssignedTasks";
import TeamHelp from "../pages/teamMember/Help";
import DocumentsManagement from "../pages/teamMember/DocumentsManagement";

const TeamRoutes = () => (
  <>
    <Route path="/team" element={<TeamMembersLayout />}>
      <Route index element={<TeamDashboard />} />
      <Route path="dashboard" element={<TeamDashboard />} />
      <Route path="assignedproject" element={<AssignedProject />} />
      <Route path="assignedtasks" element={<AssignedTasks />} />
      <Route path="documents" element={<DocumentsManagement />} />
      <Route path="help" element={<TeamHelp />} />
    </Route>
  </>
);

export default TeamRoutes;