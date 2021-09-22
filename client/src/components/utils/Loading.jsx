import React from "react";
import logo from "./logo.gif";
import "../../App.scss";
const Loading = () => {
  return (
    <div className="loading">
      <img src={logo} alt="Loading Logo" />
    </div>
  );
};

export default Loading;
