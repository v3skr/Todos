import React, { Fragment, useState, useContext } from "react";
import TodosContext from "../../../../context/Todos/TodosContext";
import "./TodosCard.scss";

const TodosCard = ({
  title = "title",
  date = "2002-09-21",
  desc = "lorem balabal",
}) => {
  const [config, setConfig] = useState({
    completed: false,
    inEdit: false,
  });
  const [state, setState] = useState({
    title,
    date,
    desc,
  });
  const { toggleDialog } = useContext(TodosContext);
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const setCompleted = () => {
    setConfig({ ...config, completed: !config.completed });
  };
  const setEdit = () => {
    setConfig({ ...config, inEdit: !config.inEdit });
  };
  const cancel = () => {
    setEdit();
    setState({
      title,
      date,
      desc,
    });
  };
  const Update = () => setEdit();
  let completedStyle;
  let disFooter;
  if (config.completed) {
    completedStyle = {
      opacity: ".3",
    };
    disFooter = {
      pointerEvents: "none",
    };
  }
  return (
    <div className="todos-card" style={completedStyle}>
      <header>
        {config.inEdit ? (
          <input
            type="text"
            value={state.title}
            name="title"
            onChange={onChange}
          />
        ) : (
          <h1>{state.title}</h1>
        )}
        {config.inEdit ? (
          <input
            type="date"
            value={state.date}
            name="date"
            onChange={onChange}
          />
        ) : (
          <h2>{state.date}</h2>
        )}
      </header>
      <div className="completed" onClick={setCompleted}>
        {config.completed ? (
          <span>
            <p>Completed</p>
            <i className="fas fa-check-circle"></i>
          </span>
        ) : (
          <span>
            <p>Not Completed</p>
            <i className="far fa-times-circle"></i>
          </span>
        )}
      </div>
      <h2 className = "desc">Description :</h2>
      <main>
        {config.inEdit ? (
          <textarea value={state.desc} name="desc" onChange={onChange} />
        ) : (
          <p>{state.desc}</p>
        )}
      </main>
      <footer style={disFooter}>
        {config.inEdit ? (
          <Fragment>
            <button className="btn" onClick={cancel}>
              Cancel
            </button>
            <button className="btn" onClick={Update}>
              Update
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button className="btn" onClick={toggleDialog}>
              Delete
            </button>
            <button className="btn" onClick={setEdit}>
              Edit
            </button>
          </Fragment>
        )}
      </footer>
    </div>
  );
};

export default TodosCard;
