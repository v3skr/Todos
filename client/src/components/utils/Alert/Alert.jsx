import React from "react";
import "../../../App.scss";

const Alert = ({ alrt, style }) => {
  let color;
  if (alrt.type === "war") {
    color = {
      backgroundColor: "yellow",
      color: "#111",
    };
  } else if (alrt.type === "suc") {
    color = {
      backgroundColor: "springgreen",
      color: "#111",
    };
  }
  return (
    <div className="alert" style={{ ...color, ...style }}>
      {alrt.msg[0].toUpperCase() + alrt.msg.slice(1)}
    </div>
  );
};

export default Alert;
