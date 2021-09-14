import React, { Fragment, useState } from "react";
import "./TodosCard.scss";

const TodosCard = () => {
  const [state, setState] = useState({
    completed: false,
    inEdit: false,
  });
  const setCompleted = () => {
    setState({ ...state, completed: !state.completed });
  };
  const setEdit = () => {
    setState({ ...state, inEdit: !state.inEdit });
  };
  let completedStyle;
  let disFooter;
  if (state.completed) {
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
        {state.inEdit ? <input type="text" /> : <h1>Title</h1>}
        {state.inEdit ? <input type="date" /> : <h2>Dat and time</h2>}
      </header>
      <div className="completed" onClick={setCompleted}>
        {state.completed ? (
          <Fragment>
            Completed
            <i className="fas fa-check-circle"></i>
          </Fragment>
        ) : (
          <Fragment>
            Not Completed
            <i className="far fa-times-circle"></i>
          </Fragment>
        )}
      </div>
      <main>
        <h2>Description :</h2>
        {state.inEdit ? (
          <textarea />
        ) : (
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sunt
            commodi animi nam eum? Repellat nobis ea omnis soluta architecto ut
            voluptatem modi! Nesciunt sit labore, aliquid aspernatur
            consequuntur enim.
          </p>
        )}
      </main>
      <footer style={disFooter}>
        <button className="btn">Delete</button>
        <button className="btn" onClick={setEdit}>
          {" "}
          Edit{" "}
        </button>
      </footer>
    </div>
  );
};

export default TodosCard;
