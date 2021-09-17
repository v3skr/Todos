import React from "react";
import TodosContext from "../../../context/Todos/TodosContext";
import "./Dialog.scss";

const Dialog = () => {
  const { toggleOverLay } = React.useContext(TodosContext);
  return (
    <div className="dialog">
      <h1>This is Title</h1>
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
