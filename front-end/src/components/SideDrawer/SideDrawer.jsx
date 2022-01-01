import React from "react";
import Menu from "../../layout/Menu";
import "./SideDrawer.css";

function SideDrawer({ show, backdropClickHandler }) {
  let drawerClasses = "side-drawer";

  if (show) drawerClasses = "side-drawer open";

  return (
    <nav className={drawerClasses}>
      <Menu backdropClickHandler={backdropClickHandler} />
      <p style={{ color: "white", marginLeft: "5px" }}>
        Touch outside to close the menu {">>>"}
      </p>
    </nav>
  );
}

export default SideDrawer;