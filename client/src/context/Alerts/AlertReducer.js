import {
  REMOVE_ALERT_LOGIN,
  REMOVE_ALERT_SIGNUP,
  SET_ALERT_LOGIN,
  SET_ALERT_SIGNUP,
  SET_ALERT_CHANGE_PASS,
  REMOVE_ALERT_CHANGE_PASS,
  REMOVE_NEW_PASS_ALERT,
  SET_NEW_PASS_ALERT,
} from "../../types";

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT_LOGIN: {
      return {
        ...state,
        alertsLogin: [...state.alertsLogin, action.payload],
      };
    }
    case REMOVE_ALERT_LOGIN: {
      return {
        ...state,
        alertsLogin: state.alertsLogin.filter(
          (alrt) => alrt.id !== action.payload
        ),
      };
    }
    case SET_ALERT_SIGNUP: {
      return {
        ...state,
        alertsSignup: [...state.alertsSignup, action.payload],
      };
    }
    case REMOVE_ALERT_SIGNUP: {
      return {
        ...state,
        alertsSignup: state.alertsSignup.filter(
          (alrt) => alrt.id !== action.payload
        ),
      };
    }
    case SET_ALERT_CHANGE_PASS: {
      return {
        ...state,
        alertsChangePass: [...state.alertsChangePass, action.payload],
      };
    }
    case REMOVE_ALERT_CHANGE_PASS: {
      return {
        ...state,
        alertsChangePass: state.alertsChangePass.filter(
          (alrt) => alrt.id !== action.payload
        ),
      };
    }
    case SET_NEW_PASS_ALERT: {
      return {
        ...state,
        alertsNewPass: [...state.alertsNewPass, action.payload],
      };
    }
    case REMOVE_NEW_PASS_ALERT: {
      return {
        ...state,
        alertsNewPass: state.alertsNewPass.filter(
          (alrt) => alrt.id !== action.payload
        ),
      };
    }
    default:
      return { ...state };
  }
};
export default AlertReducer;
