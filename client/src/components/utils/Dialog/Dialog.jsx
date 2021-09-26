import React from "react";
import TodosContext from "../../../context/Todos/TodosContext";
import "./Dialog.scss";

const Dialog = () => {
  const { toggleOverLay, res, prompt, setType, setPrompt, setPayload } =
    React.useContext(TodosContext);
  const resetState = () => {
    toggleOverLay(false);
    setType(null);
    setPayload(null);
    setPrompt(null);
  };
  return (
    <div className="dialog">
      <h1>{prompt}</h1>
      <i className="fas fa-exclamation-circle fa-7x"></i>
      <div className="btn-con">
        <button
          className="btn"
          onClick={() => {
            resetState();
          }}
        >
          NO
        </button>
        <button
          className="btn"
          onClick={() => {
            toggleOverLay(false);
            res();
            resetState();
          }}
        >
          YES
        </button>
      </div>
    </div>
  );
};

export default Dialog;
