import React from "react";
import "./Toolbar.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

function Toolbar({ drawerToggleClickHandler }) {
  return (
    <header className="toolbar">
      <nav className="toolbar_navigation">
        <div>
          <DrawerToggleButton
            drawerToggleClickHandler={drawerToggleClickHandler}
          />
        </div>
        <div className="toolbar_logo">
          <a href="/">Periodic Tables</a>
        </div>
      </nav>
    </header>
  );
}

export default Toolbar;