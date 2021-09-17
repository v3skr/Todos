import React, { useContext, useState } from "react";
import InputItem from "../../../utils/InputItem/InputItem";
import Alert from "../../../utils/Alert/Alert";
import AlertContext from "../../../../context/Alerts/AlertContext";
import TodosContext from "../../../../context/Todos/TodosContext";
import "./AddTodo.scss";

const AddTodo = () => {
  const { alertsTodo } = useContext(AlertContext);
  const { toggleOverLay, addTodo } = useContext(TodosContext);

  const [state, setState] = useState({
    title: "",
    date: "",
    description: "",
  });
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  return (
    <div className="add-todo">
      <h1>Add A Todo</h1>
      {alertsTodo.length > 0 &&
        alertsTodo.map((alrt) => <Alert alrt={alrt} key={alrt.id} />)}
      <div className="input-con">
        <InputItem name="title" value={state.title} onChange={onChange} />
        <InputItem
          name="date"
          value={state.date}
          type="date"
          onChange={onChange}
        />
        <div className="label">
          <label htmlFor="description">Description</label>
        </div>
        <textarea
          className="desc"
          name="description"
          value={state.value}
          onChange={onChange}
        />
      </div>
      <button className="btn btn1" onClick={() => addTodo(state)}>
        Add Todo
      </button>
      <button className="btn btn2" onClick={() => toggleOverLay(false)}>
        Cancel
      </button>
    </div>
  );
};

export default AddTodo;
