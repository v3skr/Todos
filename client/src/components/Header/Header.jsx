import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const his = useHistory();
  return (
    <div className="header">
      <h1>Todos App</h1>
      <div className="nav">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="btn-con-header">
        <button className="btn" onClick={() => his.push("/login")}>
          Login
        </button>
        <button className="btn" onClick={() => his.push("/signup")}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
