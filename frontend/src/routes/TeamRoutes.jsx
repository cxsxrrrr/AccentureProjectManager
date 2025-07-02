import React from "react";
import { Route } from "react-router-dom";
import TeamMembersLayout from "../pages/principals/TeamMembersLayout";
import ProtectedRoute from '../layout/ProtectedLayout';

import TeamDashboard from "../pages/teamMember/Dashboard";
import AssignedProject from "../pages/teamMember/AssignedProject";
import AssignedTasks from "../pages/teamMember/AssignedTasks";
import TeamHelp from "../pages/teamMember/Help";

const TeamRoutes = () => (
  <>
    <Route element={<ProtectedRoute rolesPermitidos={[3]} />}> {/* Solo rol 3 (team member) */}
      <Route path="/team" element={<TeamMembersLayout />}>
        <Route index element={<TeamDashboard />} />
        <Route path="dashboard" element={<TeamDashboard />} />
        <Route path="assignedproject" element={<AssignedProject />} />
        <Route path="assignedtasks" element={<AssignedTasks />} />
        <Route path="help" element={<TeamHelp />} />
      </Route>
    </Route>
  </>
);

export default TeamRoutes;