import { TOGGLE_OVERLAY, TOGGLE_ADD_TODO, TOGGLE_DIALOG } from "../../types";

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
  }
};
export default TodosReducer;
