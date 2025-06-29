import Dashboard from "../../pages/projectManager/Dashboard";
import ProjectManagement from "../../pages/projectManager/ProjectManagement";
import TeamManagement from "../../pages/projectManager/TeamManagement";
import TaskManagement from "../../pages/projectManager/TaskManagement";
import ResourcesManagement from "../../pages/projectManager/ResourcesManagement";
import ProjectMilestones from "../../pages/projectManager/ProjectMilestones";
import TrackingProject from "../../pages/projectManager/TrackingProject";
import GenerateReport from "../../pages/projectManager/GenerateReport";
import Help from "../../pages/projectManager/Help";

import dashboardIcon from "../../assets/icons/dashboard.svg";
import projectIcon from "../../assets/icons/project.svg";
import employeesIcon from "../../assets/icons/employees.svg";
import taskIcon from "../../assets/icons/task.svg";
import allocateIcon from "../../assets/icons/allocate.svg";
import milestonesIcon from "../../assets/icons/milestones.svg"
import trackingIcon from "../../assets/icons/tracking.svg";
import reportIcon from "../../assets/icons/report.svg";
import helpIcon from "../../assets/icons/help.svg";

const managerMenu = [
  { texto: "Dashboard", icon: dashboardIcon, path: "/manager/dashboard", component: Dashboard },
  { texto: "Project Management", icon: projectIcon, path: "/manager/projectmanagement", component: ProjectManagement },
  { texto: "Team Management", icon: employeesIcon, path: "/manager/teammanagement", component: TeamManagement },
  { texto: "Task Management", icon: taskIcon, path: "/manager/taskmanagement", component: TaskManagement },
  { texto: "Resources Management", icon: allocateIcon, path: "/manager/resourcesmanagement", component: ResourcesManagement },
  { texto: "Project Milestones", icon: milestonesIcon, path: "/manager/projectmilestones", component: ProjectMilestones },
  { texto: "Tracking Project", icon: trackingIcon, path: "/manager/trackingproject", component: TrackingProject },
  { texto: "Generate Report", icon: reportIcon, path: "/manager/generatereport", component: GenerateReport },
  { texto: "Help", icon: helpIcon, path: "/manager/help", component: Help },
];

export default managerMenu;
