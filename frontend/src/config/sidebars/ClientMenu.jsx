import Dashboard from "../../pages/client/Dashboard";

import Help from "../../pages/client/Help";

import dashboardIcon from "../../assets/icons/dashboard.svg";

import helpIcon from "../../assets/icons/help.svg";

const clientMenu = [
  {
    texto: "Dashboard",
    path: "/client/dashboard",
    icon: dashboardIcon,
    component: Dashboard,
  },
 
  {
    texto: "Help",
    path: "/client/help",
    icon: helpIcon,
    component: Help,
  },
];

export default clientMenu;
