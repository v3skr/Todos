import { useReducer } from "react";
import TodosContext from "./TodosContext";
import TodosReducer from "./TodosReducer";

const TodosState = (props) => {
  const initalState = {};
  const [state, dispatch] = useReducer(TodosReducer, initalState);

  return (
    <TodosContext.Provider value={{}}>{props.children}</TodosContext.Provider>
  );
};
