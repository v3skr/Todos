import { useReducer, useContext } from "react";
import AlertContext from "../../context/Alerts/AlertContext";
import TodosContext from "./TodosContext";
import TodosReducer from "./TodosReducer";
import joi from "@hapi/joi";
import axios from "axios";
import {
  TOGGLE_OVERLAY,
  TOGGLE_ADD_TODO,
  TOGGLE_DIALOG,
  TOGGLE_LOADING,
  SET_TODOS,
  ADD_TODO,
} from "../../types";

const TodosState = (props) => {
  const { setTodoAlert } = useContext(AlertContext);
  const initalState = {
    isOverLay: false,
    isDialog: false,
    isAddTodo: false,
    isLoading: false,
    todos: [],
  };
  const [state, dispatch] = useReducer(TodosReducer, initalState);

  const toggleScroll = (payload) => {
    !payload
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  };

  //Toggles Overlay
  const toggleOverLay = (payload = false) => {
    if (!payload) {
      if (state.isDialog) toggleDialog(false);
      if (state.isAddTodo) toggleAddTodo(false);
    }
    dispatch({ type: TOGGLE_OVERLAY, payload });
  };
  //Toggles Dialog
  const toggleDialog = (payload = false) => {
    dispatch({ type: TOGGLE_DIALOG, payload });
    toggleScroll(payload);
    toggleOverLay(true);
  };
  //Toggles Add todo Card
  const toggleAddTodo = (payload = false) => {
    toggleScroll(false);
    dispatch({ type: TOGGLE_ADD_TODO, payload });
    toggleOverLay(true);
  };

  //ADD TODO
  const addTodo = async (todo) => {
    const todoSchema = joi.object({
      title: joi.string().required(),
      date: joi.string().required(),
      description: joi.string().allow(""),
      completed: joi.boolean().required(),
      userid: joi.string(),
    });
    const { error } = todoSchema.validate(todo);
    if (error) {
      return setTodoAlert(error.details[0].message.replace(/"/g, ""));
    }
    dispatch({ type: ADD_TODO, payload: todo });
    if (!localStorage.token) {
      return;
    }
    toggleLoading(true);
    axios.defaults.headers.common["token"] = localStorage.token;
    toggleLoading(false);
    const res = await axios.post("/todos", todo);
  };

  //Set loading
  const toggleLoading = (payload) =>
    dispatch({ type: TOGGLE_LOADING, payload });

  // Load todos
  const loadTodos = async () => {
    if (!localStorage.token) return;
    axios.defaults.headers.common["token"] = localStorage.token;
    toggleLoading(true);
    const res = await axios.get("/todos");
    toggleLoading(false);
    dispatch({ type: SET_TODOS, payload: res.data });
  };
  return (
    <TodosContext.Provider
      value={{
        isOverLay: state.isOverLay,
        isAddTodo: state.isAddTodo,
        isDialog: state.isDialog,
        isLoading: state.isLoading,
        todos: state.todos,
        toggleAddTodo,
        toggleOverLay,
        toggleDialog,
        toggleLoading,
        loadTodos,
        addTodo,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
export default TodosState;
