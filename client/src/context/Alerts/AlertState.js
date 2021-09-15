import { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { v4 as uuid } from "uuid";
import {
  REMOVE_ALERT_LOGIN,
  REMOVE_ALERT_SIGNUP,
  SET_ALERT_LOGIN,
  SET_ALERT_SIGNUP,
  SET_ALERT_CHANGE_PASS,
  REMOVE_ALERT_CHANGE_PASS,
} from "../../types";

const AlertState = (props) => {
  const initalState = {
    alertsLogin: [],
    alertsSignup: [],
    alertsChangePass: [],
  };
  const [state, dispatch] = useReducer(AlertReducer, initalState);

  //Set login Alerts
  const setAlertLogin = (msg, type) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT_LOGIN,
      payload: { msg, type, id },
    });
    setTimeout(() => removeAlertLogin(id), 3000);
  };

  //Removes Login Alerts
  const removeAlertLogin = (id) => {
    dispatch({ type: REMOVE_ALERT_LOGIN, payload: id });
  };

  //Sets sign up Alert
  const setSignUpAlerts = (msg, type) => {
    const id = uuid();
    dispatch({
      type: SET_ALERT_SIGNUP,
      payload: { msg, type, id },
    });
    setTimeout(() => removeSignUpAlers(id), 3000);
  };

  //Removes sign up alrets
  const removeSignUpAlers = (id) => {
    dispatch({
      type: REMOVE_ALERT_SIGNUP,
      payload: id,
    });
  };

  //Set change pass alert
  const setAlertChangePass = (msg, type) => {
    const id = uuid();
    dispatch({ type: SET_ALERT_CHANGE_PASS, payload: { msg, type, id } });
    setTimeout(() => removeChangePassAlert(id), 3000);
  };

  // Remove change pass alert
  const removeChangePassAlert = (id) => {
    dispatch({ type: REMOVE_ALERT_CHANGE_PASS, payload: id });
  };
  return (
    <AlertContext.Provider
      value={{
        alertsLogin: state.alertsLogin,
        alertsSignup: state.alertsSignup,
        alertsChangePass: state.alertsChangePass,
        setAlertLogin,
        setSignUpAlerts,
        setAlertChangePass,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
