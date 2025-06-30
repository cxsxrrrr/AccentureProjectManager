import React from "react";
import { Route } from "react-router-dom";
import ManagerLayout from "../pages/principals/ManagerLayout";

import ManagerDashboard from "../pages/projectManager/Dashboard";
import DocumentsManagement from "../pages/projectManager/DocumentsManagement";
import GenerateReport from "../pages/projectManager/GenerateReport";
import ManagerHelp from "../pages/projectManager/Help";
import ProjectManagement from "../pages/projectManager/ProjectManagement";
import ResourcesManagement from "../pages/projectManager/ResourcesManagement";
import ProjectMilestones from "../pages/projectManager/ProjectMilestones";
import TaskManagement from "../pages/projectManager/TaskManagement";
import TeamManagement from "../pages/projectManager/TeamManagement";
import TrackingProject from "../pages/projectManager/TrackingProject";

const ManagerRoutes = () => (
    <>
      <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="documents" element={<DocumentsManagement />} />
            <Route path="generatereport" element={<GenerateReport />} />
            <Route path="help" element={<ManagerHelp />} />
            <Route path="projectmanagement" element={<ProjectManagement />} />
            <Route path="resourcesmanagement" element={<ResourcesManagement />} />
            <Route path="projectmilestones" element={<ProjectMilestones />} />
            <Route path="taskmanagement" element={<TaskManagement />} />
            <Route path="teammanagement" element={<TeamManagement />} />
            <Route path="trackingproject" element={<TrackingProject />} />
        </Route>
    </>

);

export default ManagerRoutes;
