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
  SET_NEW_PASS_ALERT,
  REMOVE_NEW_PASS_ALERT,
  REMOVE_ALRET_ACCOUNT,
  SET_ALRET_ACCOUNT,
  SET_TODO_ALERT,
  REMOVE_TODO_ALERT,
  SET_TYPE,
  SET_PROPMT,
  SET_PAYLOD,
} from "../../types";

const AlertState = (props) => {
  const initalState = {
    alertsLogin: [],
    alertsSignup: [],
    alertsChangePass: [],
    alertsNewPass: [],
    alertsAccount: [],
    alertsTodo: [],
    type: null,
    prompt: null,
    payload: null,
  };
  const [state, dispatch] = useReducer(AlertReducer, initalState);
  const res = (type) => {
    switch (type) {
      default: {
        return;
      }
    }
  };

  const setType = (type) => {
    dispatch({ type: SET_TYPE, payload: type });
  };
  const setPayload = (payload) => {
    dispatch({ type: SET_PAYLOD, payload });
  };
  const setPrompt = (prompt) => {
    dispatch({ type: SET_PROPMT, payload: prompt });
  };
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
  const setAlertChangePass = (msg, type = "err") => {
    const id = uuid();
    dispatch({ type: SET_ALERT_CHANGE_PASS, payload: { msg, type, id } });
    setTimeout(() => removeChangePassAlert(id), 3000);
  };

  // Remove change pass alert
  const removeChangePassAlert = (id) => {
    dispatch({ type: REMOVE_ALERT_CHANGE_PASS, payload: id });
  };

  //set New pass alert
  const setNewPassAlert = (msg, type = "err") => {
    const id = uuid();
    dispatch({ type: SET_NEW_PASS_ALERT, payload: { msg, type, id } });
    setTimeout(() => removeNewPassAlert(id), 3000);
  };

  //remove new pass alert
  const removeNewPassAlert = (id) =>
    dispatch({ type: REMOVE_NEW_PASS_ALERT, payload: id });

  //Set Account Alert
  const setAccountAlert = (msg, type = "err") => {
    const id = uuid();
    dispatch({ type: SET_ALRET_ACCOUNT, payload: { msg, type, id } });
    setTimeout(() => removeAccountAlert(id), 3000);
  };
  //Rmove Account Alert
  const removeAccountAlert = (id) =>
    dispatch({ type: REMOVE_ALRET_ACCOUNT, payload: id });

  //set todo alert
  const setTodoAlert = (msg, type) => {
    const id = uuid();
    dispatch({ type: SET_TODO_ALERT, payload: { msg, type, id } });
    setTimeout(() => removeTodoAlert(id), 3000);
  };
  const removeTodoAlert = (id) =>
    dispatch({ type: REMOVE_TODO_ALERT, payload: id });
  return (
    <AlertContext.Provider
      value={{
        alertsLogin: state.alertsLogin,
        alertsSignup: state.alertsSignup,
        alertsChangePass: state.alertsChangePass,
        alertsNewPass: state.alertsNewPass,
        alertsAccount: state.alertsAccount,
        alertsTodo: state.alertsTodo,
        prompt: state.prompt,
        payload: state.payload,
        type: state.type,
        setAlertLogin,
        setSignUpAlerts,
        setAlertChangePass,
        setNewPassAlert,
        setAccountAlert,
        setTodoAlert,
        setType,
        setPayload,
        setPrompt,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
