import React from "react";
import TodosCard from "./TodosCard/TodosCard";
import AuthContext from "../../../context/Auth/AuthContext";
import TodosContext from "../../../context/Todos/TodosContext";
import Loading from "../../utils/Loading";
import { useHistory } from "react-router";
import "./TodosPages.scss";

const TodosPages = () => {
  const history = useHistory();
  React.useEffect(() => {
    if (!localStorage.token) history.push("/");
  }, []);
  const { setId } = React.useContext(AuthContext);
  const { todos, loadTodos, isLoading } = React.useContext(TodosContext);
  React.useEffect(() => {
    setId();
    if (localStorage.token) {
      async function callData() {
        await loadTodos();
      }
      callData();
    }
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="todos-page">
      <header>
        {todos.length > 0 ? (
          <h1>See all Your Todos</h1>
        ) : (
          <h1>No Current Todos...</h1>
        )}
      </header>
      <main>
        {todos.length > 0 &&
          todos.map((todo, id) => <TodosCard todo={todo} key={id} />)}
      </main>
    </div>
  );
};

export default TodosPages;
