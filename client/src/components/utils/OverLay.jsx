import React, { useContext } from "react";
import "../../App.scss";
import TodosContext from "../../context/Todos/TodosContext";

const OverLay = () => {
  const { toggleOverLay } = useContext(TodosContext);
  return <div className="overlay" onClick={() => toggleOverLay(false)}></div>;
};

export default OverLay;
