import React from "react";
import "./TodosPages.scss";
import TodosCard from "./TodosCard/TodosCard";

const TodosPages = () => {
  return (
    <div className="todos-page">
      <header>
        <h1>See all Your Todos</h1>
      </header>
      <main>
        <TodosCard />
        <TodosCard />
        <TodosCard />
        <TodosCard />
        <TodosCard />
        <TodosCard />
      </main>
    </div>
  );
};

export default TodosPages;
