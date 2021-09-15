import React, { useContext, useState } from "react";
import "./NewPass.scss";
import AuthContext from "../../../context/Auth/AuthContext";
import AlertContext from "../../../context/Alerts/AlertContext";

const NewPass = () => {
  const [state, setState] = useState({
    password: "",
    password2: "",
  });
  const { setNewPass } = useContext(AuthContext);
  const { alertsNewPass } = useContext(AlertContext);
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
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  return (
    <div className="new-pass">
      <h1>Enter A New Password</h1>
      {alertsNewPass.length > 0 &&
        alertsNewPass.map((alrt) => (
          <div className="alert" key={alrt.id}>
            {alrt.msg}
          </div>
        ))}
      <div className="input-item">
        <div className="label">
          <label htmlFor="">Password</label>
        </div>
        <input
          type="password"
          name="password"
          onChange={onChange}
          value={state.password}
        />
      </div>
      <div className="input-item">
        <div className="label">
          <label htmlFor="">Confirm Password</label>
        </div>
        <input
          type="password"
          name="password2"
          onChange={onChange}
          value={state.password2}
        />
      </div>
      {state.password && (
        <div
          style={{
            position: "absolute",
            bottom: "8rem",
            left: "10px",
            right: "10px",
          }}
        >
          <h5>
            Password Must Include numbers , letters , symbols and must be 8 or
            more charachters
          </h5>
          <div className="con">
            <div className="password-check-line" style={style}></div>
          </div>
        </div>
      )}
      <button className="btn" onClick={() => setNewPass(state)}>
        Change Password
      </button>
    </div>
  );
};

export default NewPass;
