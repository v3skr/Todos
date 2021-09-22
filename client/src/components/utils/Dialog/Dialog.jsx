import React from "react";
import AlertContext from "../../../context/Alerts/AlertContext";
import TodosContext from "../../../context/Todos/TodosContext";
import "./Dialog.scss";

const Dialog = () => {
  const { toggleOverLay } = React.useContext(TodosContext);
  const { prompt } = React.useContext(AlertContext);
  return (
    <div className="dialog">
      <h1>{prompt}</h1>
      <i className="fas fa-exclamation-circle fa-7x"></i>
      <div className="btn-con">
        <button className="btn" onClick={() => toggleOverLay(false)}>
          NO
        </button>
        <button className="btn">YES</button>
      </div>
    </div>
  );
};

export default Dialog;
