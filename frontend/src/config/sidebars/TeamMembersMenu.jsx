import Dashboard from "../../pages/teamMember/Dashboard";
import AssignedTasks from "../../pages/teamMember/AssignedTasks";
import AssignedProject from "../../pages/teamMember/AssignedProject";
import DocumentsManagement from "../../pages/teamMember/DocumentsManagement";
import Help from "../../pages/teamMember/Help";

import dashboardIcon from "../../assets/icons/dashboard.svg";
import tasksIcon from "../../assets/icons/assign_task.svg";
import projectIcon from "../../assets/icons/project.svg";
import documentsIcon from "../../assets/icons/documents.svg";
import helpIcon from "../../assets/icons/help.svg";

const teamMemberMenu = [
  { texto: "Dashboard", icon: dashboardIcon, path: "/team/dashboard", component: Dashboard },
  { texto: "Assigned Tasks", icon: tasksIcon, path: "/team/tasks", component: AssignedTasks },
  { texto: "Assigned Project", icon: projectIcon, path: "/team/project", component: AssignedProject },
  { texto: "Documents Management", icon: documentsIcon, path: "/team/documents", component: DocumentsManagement },
  { texto: "Help", icon: helpIcon, path: "/team/help", component: Help },
];

export default teamMemberMenu;
