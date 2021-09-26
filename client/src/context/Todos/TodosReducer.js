import {
  TOGGLE_OVERLAY,
  TOGGLE_ADD_TODO,
  TOGGLE_DIALOG,
  TOGGLE_LOADING,
  SET_TODOS,
  ADD_TODO,
  SET_PROPMT,
  SET_TYPE,
  SET_PAYLOAD,
  DELETE_TODO,
} from "../../types";

const TodosReducer = (state, action) => {
  switch (action.type) {
    default: {
      return { ...state };
    }
    case TOGGLE_OVERLAY: {
      return {
        ...state,
        isOverLay: action.payload,
      };
    }
    case TOGGLE_ADD_TODO: {
      return {
        ...state,
        isDialog: state.isDialog ? false : state.isDialog,
        isAddTodo: action.payload,
      };
    }
    case TOGGLE_DIALOG: {
      return {
        ...state,
        isAddTodo: state.isAddTodo ? false : state.isAddTodo,
        isDialog: action.payload,
      };
    }
    case TOGGLE_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case ADD_TODO: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }
    case SET_TODOS: {
      return {
        ...state,
        todos: action.payload,
      };
    }
    case SET_PROPMT: {
      return {
        ...state,
        prompt: action.payload,
      };
    }
    case SET_TYPE: {
      return {
        ...state,
        type: action.payload,
      };
    }
    case SET_PAYLOAD: {
      return {
        ...state,
        payload: action.payload,
      };
    }
    case DELETE_TODO: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };
    }
  }
};
export default TodosReducer;
