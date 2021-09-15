import React from "react";
import { useHistory } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const his = useHistory();
  return !true ? (
    <div className="header">
      <h1>Todos</h1>
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
  ) : (
    <div className="header2">
      <h1>Home</h1>
      <div className="nav">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="header-btns ">
        <i className="fas fa-home fa-2x"></i>
        <i className="far fa-user-circle fa-2x"></i>
        <i className="fas fa-plus fa-2x"></i>
      </div>
    </div>
  );
};

export default Header;
