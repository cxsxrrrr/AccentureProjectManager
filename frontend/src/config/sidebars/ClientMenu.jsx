import Dashboard from "../../pages/client/Dashboard";
import TrackingProject from "../../pages/client/TrackingProject";
import Help from "../../pages/client/Help";

import dashboardIcon from "../../assets/icons/dashboard.svg";
import trackingIcon from "../../assets/icons/tracking.svg";
import helpIcon from "../../assets/icons/help.svg";

const clientMenu = [
  {
    texto: "Dashboard",
    path: "/client/dashboard",
    icon: dashboardIcon,
    component: Dashboard,
  },
  {
    texto: "Tracking Project",
    path: "/client/tracking",
    icon: trackingIcon,
    component: TrackingProject,
  },
  {
    texto: "Help",
    path: "/client/help",
    icon: helpIcon,
    component: Help,
  },
];

export default clientMenu;
