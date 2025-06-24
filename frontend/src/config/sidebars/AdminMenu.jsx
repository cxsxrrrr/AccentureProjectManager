import Dashboard from "../../pages/administrator/Dashboard";
import Employees from "../../pages/administrator/Employees";
import UserManagement from "../../pages/administrator/UserManagement";
import RoleManagement from "../../pages/administrator/RoleManagement";
import AllocateResources from "../../pages/administrator/AllocateResources";
import Help from "../../pages/administrator/Help";
import dashboardIcon from "../../assets/icons/dashboard.svg";
import employeesIcon from "../../assets/icons/employees.svg";
import userIcon from "../../assets/icons/user.svg";
import roleIcon from "../../assets/icons/role.svg";
import permissionIcon from "../../assets/icons/permission.svg";
import allocateIcon from "../../assets/icons/allocate.svg";
import helpIcon from "../../assets/icons/help.svg";
import CategoriesandSkills from "../../pages/administrator/CategoriesandSkills";

const adminMenu = [
  { texto: "Dashboard", icon: dashboardIcon, path: "/admin/dashboard", component: Dashboard },
  { texto: "Employees", icon: employeesIcon, path: "/admin/employees", component: Employees },
  { texto: "User Management", icon: userIcon, path: "/admin/usermanagement", component: UserManagement },
  { texto: "Role Management", icon: roleIcon, path: "/admin/rolemanagement", component: RoleManagement },
  { texto: "Categories and Skills", icon: permissionIcon, path: "/admin/categoriesandskills", component: CategoriesandSkills },
  { texto: "Allocate Resources", icon: allocateIcon, path: "/admin/allocateresources", component: AllocateResources },
  { texto: "Help", icon: helpIcon, path: "/admin/help", component: Help },
];

export default adminMenu;
