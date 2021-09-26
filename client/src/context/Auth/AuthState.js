import { useReducer, useContext } from "react";
import AlertContext from "../../context/Alerts/AlertContext";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import TodosContext from "../Todos/TodosContext";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import joi from "@hapi/joi";
import { SET_ID, SET_USER } from "../../types";

const AuthState = (props) => {
  const pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const {
    setAlertLogin,
    setSignUpAlerts,
    setAlertChangePass,
    setNewPassAlert,
    setAccountAlert,
  } = useContext(AlertContext);
  const { toggleLoading } = useContext(TodosContext);
  const history = useHistory();
  const initalState = {
    user: null,
    id: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initalState);

  //user login :: CREATE
  const login = async (user) => {
    const userSchema = joi.object({
      username: joi.string().trim().alphanum().min(3).max(16).required(),
      password: joi.string().min(8).required(),
    });
    const { error } = userSchema.validate(user);
    if (error) {
      return setAlertLogin(error.details[0].message.replace(/"/g, ""), "err");
    }
    toggleLoading(true);
    const res = await axios.post("/userlogin", user);
    toggleLoading(false);
    if (res.data.type === "err") return setAlertLogin(res.data.msg);
    localStorage.setItem("token", res.data);
    history.push("/todos");
  };
  const setId = () => {
    if (localStorage.token) {
      const decoded = jwt_decode(localStorage.token);
      dispatch({ type: SET_ID, payload: decoded.id });
    }
  };
  //user sign up :: READ
  const signUp = async (user) => {
    const userSchema = joi.object({
      Email: joi.string().email().required(),
      username: joi.string().alphanum().min(3).max(16).required(),
      password: joi.string().min(8).required(),
    });
    const { error } = userSchema.validate(user);
    if (error) {
      return setSignUpAlerts(error.details[0].message.replace(/"/g, ""), "err");
    }
    if (!pattern.test(user.password)) {
      return setSignUpAlerts(
        "password must include a Special charachter",
        "err"
      );
    }
    toggleLoading(true);
    const res = await axios.post("/users", user);
    toggleLoading(false);
    setSignUpAlerts(res.data.msg, res.data.type);
    if (res.data.type === "suc") {
      setTimeout(() => history.push("/login"), 1500);
    }
  };
  //load user info :: READ
  const loadUser = async () => {
    if (!localStorage.token) return history.push("/");
    axios.defaults.headers.common["token"] = localStorage.token;
    toggleLoading(true);
    const res = await axios.get("/users");
    toggleLoading(false);
    if (res.data.msg === "jwt expired") {
      history.push("/");
      localStorage.removeItem("token");
      return;
    }
    dispatch({ type: SET_USER, payload: res.data });
  };

  //updateAccount :: UPDATE
  const updateAccount = () => {
    setAccountAlert("Checkd", "suc");
  };

  //delete user account :: DELETE
  const deleteAcoount = () => {};

  //Reset Password :: UPDATE
  const changePass = (Email) => {
    const EmailSchema = joi.object({
      Email: joi.string().email().required(),
    });
    const { error } = EmailSchema.validate({ Email });
    if (error) {
      setAlertChangePass(error.details[0].message.replace(/"/g, ""), "err");
    }
    if (!pattern.test(state.password))
      return setAlertChangePass(
        "password must include a Special charachter",
        "err"
      );
  };

  // Set new Password
  const setNewPass = (state) => {
    if (state.password !== state.password2)
      return setNewPassAlert("Passwords Do Not Match");

    const passwordSchema = joi.object({
      password: joi.string().min(8).required(),
    });
    const { error } = passwordSchema.validate({ password: state.password });
    if (error) {
      return setNewPassAlert(error.details[0].message.replace(/"/g, ""), "err");
    }
    if (!pattern.test(state.password))
      return setNewPassAlert(
        "password must include a Special charachter",
        "err"
      );
  };
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        id: state.id,
        setId,
        login,
        signUp,
        changePass,
        setNewPass,
        updateAccount,
        loadUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
