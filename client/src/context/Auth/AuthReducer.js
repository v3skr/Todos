import { SET_ID, SET_USER } from "../../types";
const AuthReducer = (state, action) => {
  switch (action.type) {
    default:
      return { ...state };
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SET_ID: {
      return {
        ...state,
        id: action.payload,
      };
    }
  }
};
export default AuthReducer;
