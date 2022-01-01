import React from "react";
import "./DrawerToggleButton.css";

function DrawerToggleButton({ drawerToggleClickHandler }) {
  return (
    <button className="toggle-button" onClick={drawerToggleClickHandler}>
      <div className="toggle-button_line" />
      <div className="toggle-button_line" />
      <div className="toggle-button_line" />
    </button>
  );
}

export default DrawerToggleButton;