import React, { useState, useContext } from "react";
import InputItem from "../../utils/InputItem/InputItem";
import AlretContext from "../../../context/Alerts/AlertContext";
import AuthContext from "../../../context/Auth/AuthContext";
import Alert from "../../utils/Alert/Alert";
import "../LoginPage/Card/Card.scss";
import "./Card.scss";
import "../../../App.scss";

const Card = () => {
  const alretContext = useContext(AlretContext);
  const authContext = useContext(AuthContext);
  const { alertsSignup } = alretContext;
  const { signUp } = authContext;
  const [state, setState] = useState({
    Email: "",
    username: "",
    password: "",
  });
  let style;
  const checkDigit = (str) => {
    const digits = "1234567890";
    for (let i = 0; i < str.length; i++) {
      if (digits.includes(str[i])) return true;
    }
    return false;
  };
  const checkSc = (str) => {
    const sc = '!""£$%^&*()_"<>?\'@#~{}[]=-+¬`|';
    for (let i = 0; i < str.length; i++) {
      if (sc.includes(str[i])) return true;
    }
    return false;
  };
  const checkString = (str) => {
    const string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < str.length; i++) {
      if (string.includes(str[i])) return true;
    }
    return false;
  };
  if (state.password !== "") {
    const isNum = checkDigit(state.password);
    const isSc = checkSc(state.password);
    const isChar = checkString(state.password);
    if (isChar && isNum && isSc && state.password.length > 7) {
      style = {
        width: "90%",
        backgroundColor: "mediumspringgreen",
      };
    } else if (isNum || isSc || isChar) {
      style = {
        width: "30%",
        color: "red",
      };
      if (
        (isNum && isChar) ||
        (isNum && isSc) ||
        (isSc && isChar) ||
        state.password.length > 7
      ) {
        style = {
          width: "60%",
          backgroundColor: "yellow",
        };
      }
    }
  }
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onClick = (e) => {
    e.preventDefault();
    signUp(state);
  };
  return (
    <form>
      <div className="signup-card">
        <header>
          <h2>Sign Up</h2>
        </header>
        {alertsSignup.length > 0 &&
          alertsSignup.map((alrt) => <Alert alrt={alrt} key={alrt.id} />)}
        <main>
          <InputItem
            name="username"
            value={state.username}
            onChange={onChange}
            type="text"
          />
          <InputItem
            name="Email"
            value={state.Email}
            onChange={onChange}
            type="email"
          />
          <InputItem
            name="password"
            value={state.password}
            onChange={onChange}
            type="password"
          />
          {state.password && (
            <div
              style={{
                position: "absolute",
                bottom: "6rem",
                left: "10px",
                right: "10px",
              }}
            >
              <h5>
                Password Must Include numbers , letters , symbols and must be 8
                or more charachters
              </h5>
              <div className="password-check-line" style={style}></div>
            </div>
          )}
        </main>
        <button className="btn" onClick={onClick}>
          Sign Up
        </button>
      </div>
    </form>
  );
};
export default Card;
