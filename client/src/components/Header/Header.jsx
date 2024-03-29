import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import TodosContext from "../../context/Todos/TodosContext";
import { LOGOUT } from "../../types";
import "./Header.scss";

const Header = () => {
  const his = useHistory();
  const { toggleDialog, toggleAddTodo, toggleOverLay, setPrompt, setType } =
    React.useContext(TodosContext);
  return !localStorage.token ? (
    <div className="header">
      <h1>Todos</h1>
      <div className="nav" onClick={() => toggleOverLay(false)}>
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
      <h1>ToDos</h1>
      <div className="nav">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="header-btns">
        <i
          className="fas fa-power-off fa-2x"
          onClick={() => {
            toggleDialog(true);
            setPrompt("Are You Sure You Want To Log Out ?");
            setType(LOGOUT);
          }}
        ></i>
        <i
          className="fas fa-home fa-2x"
          onClick={() => {
            his.push("/todos");
            toggleOverLay(false);
          }}
        ></i>
        <i
          className="far fa-user-circle fa-2x"
          onClick={() => {
            his.push("/account");
            toggleOverLay(false);
          }}
        ></i>
        {his.location.pathname === "/todos" && (
          <i
            className="fas fa-plus fa-2x"
            onClick={() => toggleAddTodo(true)}
          ></i>
        )}
      </div>
    </div>
  );
};

export default Header;
