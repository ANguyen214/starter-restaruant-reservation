import React, { useState } from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import Toolbar from "../components/Toolbar/Toolbar";
import SideDrawer from "../components/SideDrawer/SideDrawer";
import Backdrop from "../components/Backdrop/Backdrop";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () =>
    setSideDrawerOpen((prevState) => !prevState);

  const backdropClickHandler = () => setSideDrawerOpen(false);

  const screenWidth = window.screen.width;

  let toolbarAndSideDrawerAndBackdrop;
  let backdrop;
  let style;
  let menu;

  if (screenWidth < 960) {
    if (sideDrawerOpen) {
      backdrop = <Backdrop backdropClickHandler={backdropClickHandler} />;
    }

    toolbarAndSideDrawerAndBackdrop = (
      <>
        <Toolbar drawerToggleClickHandler={drawerToggleClickHandler} />
        <SideDrawer
          show={sideDrawerOpen}
          setSideDrawerOpen={setSideDrawerOpen}
          backdropClickHandler={backdropClickHandler}
        />
        {backdrop}
      </>
    );

    style = { marginTop: "56px" };
  } else {
    menu = <Menu />;
  }

  return (
    <div style={{ height: "100%" }}>
      {toolbarAndSideDrawerAndBackdrop}
      <div className="container-fluid" style={style}>
        <div className="row h-100">
          <div className="col-md-2 side-bar">{menu}</div>
          <div className="col">
            <Routes />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;