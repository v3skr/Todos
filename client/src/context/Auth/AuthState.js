import { useReducer, useContext } from "react";
import AlertContext from "../../context/Alerts/AlertContext";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import joi from "@hapi/joi";

const AuthState = (props) => {
  const pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const {
    setAlertLogin,
    setSignUpAlerts,
    setAlertChangePass,
    setNewPassAlert,
    setAccountAlert,
  } = useContext(AlertContext);
  const initalState = {};

  const [state, dispatch] = useReducer(AuthReducer, initalState);

  //user login :: CREATE
  const login = (user) => {
    const userSchema = joi.object({
      username: joi.string().trim().alphanum().min(3).max(16).required(),
      password: joi.string().min(8).required(),
    });
    const { error } = userSchema.validate(user);
    if (error) {
      return setAlertLogin(error.details[0].message.replace(/"/g, ""), "err");
    }
  };

  //user sign up :: READ
  const signUp = (user) => {
    const userSchema = joi.object({
      Email: joi.string().email().required(),
      username: joi.string().alphanum().min(3).max(16).required(),
      password: joi.string().min(8).required(),
    });
    const { error } = userSchema.validate(user);
    if (error) {
      return setSignUpAlerts(error.details[0].message.replace(/"/g, ""), "err");
    }
    if (!pattern.test(user.password))
      return setSignUpAlerts(
        "password must include a Special charachter",
        "err"
      );
  };

  //load user info :: READ
  const loadUser = () => {};

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
        login,
        signUp,
        changePass,
        setNewPass,
        updateAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
