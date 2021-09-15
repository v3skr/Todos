import {
  DELETE_ACCOUNT,
  LOAD_USER,
  LOGIN,
  SIGN_UP,
  UPDATE_ACCOUNT,
} from "../../types";
const AuthReducer = (action, state) => {
  switch (action.type) {
    default:
      return { ...state };

    case LOGIN: {
    }
    case SIGN_UP: {
    }
    case UPDATE_ACCOUNT: {
    }
    case DELETE_ACCOUNT: {
    }
    case LOAD_USER: {
    }
  }
};
export default AuthReducer;
