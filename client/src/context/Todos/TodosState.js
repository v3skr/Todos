import { useReducer, useContext } from "react";
import AlertContext from "../../context/Alerts/AlertContext";
import TodosContext from "./TodosContext";
import TodosReducer from "./TodosReducer";
import joi from "@hapi/joi";
import { TOGGLE_OVERLAY, TOGGLE_ADD_TODO, TOGGLE_DIALOG } from "../../types";

const TodosState = (props) => {
  const { setTodoAlert } = useContext(AlertContext);
  const initalState = {
    isOverLay: false,
    isDialog: false,
    isAddTodo: false,
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
    dispatch({ type: TOGGLE_ADD_TODO, payload });
    toggleOverLay(true);
  };

  //ADD TODO
  const addTodo = (todo) => {
    const todoSchema = joi.object({
      title: joi.string().alphanum().required(),
      date: joi.string().required(),
      description: joi.string().alphanum().allow(""),
    });
    const { error } = todoSchema.validate(todo);
    if (error) {
      setTodoAlert(error.details[0].message.replace(/"/g, ""));
    }
  };

  return (
    <TodosContext.Provider
      value={{
        isOverLay: state.isOverLay,
        isAddTodo: state.isAddTodo,
        isDialog: state.isDialog,
        toggleAddTodo,
        toggleOverLay,
        toggleDialog,
        addTodo,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
export default TodosState;
