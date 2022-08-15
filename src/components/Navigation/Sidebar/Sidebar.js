import { React } from "react";
import "./Sidebar.css";
import SidebarLG from "./SidebarLG/SidebarLG";
import SidebarSmallScreen from "./SidebarSmallScreen/SidebarSmallScreen";



function Sidebar() {


  return (
    <div>
      <SidebarLG />
      <SidebarSmallScreen />
    </div>
  );
}

export default Sidebar;
