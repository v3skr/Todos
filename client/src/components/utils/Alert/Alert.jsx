import React from "react";
import "../../../App.scss";

const Alert = ({ msg = "this is alert" }) => {
  return <div className="alert">{msg}</div>;
};

export default Alert;
