import { useReducer, useContext } from "react";
import AlertContext from "../../context/Alerts/AlertContext";
import { useHistory } from "react-router-dom";
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
  SET_TYPE,
  SET_PROPMT,
  SET_PAYLOAD,
  DELETE_TODO,
  LOGOUT,
} from "../../types";

const TodosState = (props) => {
  const history = useHistory();
  const { setTodoAlert } = useContext(AlertContext);
  const initalState = {
    isOverLay: false,
    isDialog: false,
    isAddTodo: false,
    isLoading: false,
    todos: [],
    prompt: null,
    type: null,
    payload: null,
  };
  const [state, dispatch] = useReducer(TodosReducer, initalState);

  const res = () => {
    switch (state.type) {
      case LOGOUT: {
        localStorage.removeItem("token");
        history.push("/");
      }
      case DELETE_TODO: {
        deleteTodo(state.payload);
      }
    }
  };

  //DELETES THE TODO ON BTN CLICK
  const deleteTodo = async (id) => {
    axios.defaults.headers.common["token"] = localStorage.token;
    axios.defaults.headers.common["todo-id"] = id;
    toggleLoading(true);
    const res = await axios.delete("/todos");
    toggleLoading(false);
    if (res.data.msg === "Task Deleted") {
      dispatch({ type: DELETE_TODO, payload: id });
    }
  };
  //Sets the type of action needed for the dialog "yes" button
  const setType = (type) => {
    dispatch({ type: SET_TYPE, payload: type });
  };
  //stores any payload if needed
  const setPayload = (payload) => {
    dispatch({ type: SET_PAYLOAD, payload });
  };
  //stores the propmt in the dialog
  const setPrompt = (prompt) => {
    dispatch({ type: SET_PROPMT, payload: prompt });
  };
  //used t toggel the scroll in once a pop up is shown
  const toggleScroll = (payload) => {
    !payload
      ? (document.body.style.overflow = "auto")
      : (document.body.style.overflow = "hidden");
  };
  //Toggles Overlay
  const toggleOverLay = (payload = false) => {
    setType(null);
    setPayload(null);
    setPrompt(null);
    if (!payload) {
      if (state.isDialog) toggleDialog(false);
      if (state.isAddTodo) toggleAddTodo(false);
    }
    dispatch({ type: TOGGLE_OVERLAY, payload });
  };
  //Toggles Dialog
  const toggleDialog = (payload = false) => {
    dispatch({ type: TOGGLE_DIALOG, payload });
    // toggleScroll(payload);
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
        prompt: state.prompt,
        type: state.type,
        payload: state.payload,
        todos: state.todos,
        toggleAddTodo,
        toggleOverLay,
        toggleDialog,
        toggleLoading,
        loadTodos,
        addTodo,
        setType,
        setPayload,
        setPrompt,
        res,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
export default TodosState;
