import React from "react";
import "./Backdrop.css";

function Backdrop({ backdropClickHandler }) {
  return <div className="backdrop" onClick={backdropClickHandler} />;
}

export default Backdrop;