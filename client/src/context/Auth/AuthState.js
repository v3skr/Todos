import { useReducer, useContext } from "react";
import AlertContext from "../../context/Alerts/AlertContext";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import joi from "@hapi/joi";

const AuthState = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlertLogin, setSignUpAlerts } = alertContext;
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
    const pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
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
  const updateAccount = (newUser) => {};

  //delete user account :: DELETE
  const deleteAcoount = () => {};

  return (
    <AuthContext.Provider
      value={{
        login,
        signUp,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
