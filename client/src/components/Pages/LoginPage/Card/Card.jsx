import React, { useState, useContext } from "react";
import AlertContext from "../../../../context/Alerts/AlertContext";
import AuthContext from "../../../../context/Auth/AuthContext";
import InputItem from "../../../utils/InputItem/InputItem";
import Alert from "../../../utils/Alert/Alert";
import "../../../../App.scss";
import "./Card.scss";

const Card = () => {
  const authContext = useContext(AuthContext);
  const { login } = authContext;
  const alertContext = useContext(AlertContext);
  const { alertsLogin } = alertContext;
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const onClick = (e) => {
    e.preventDefault();
    login(state);
  };
  return (
    <form>
      <div className="login-card">
        <header>
          <h2>Login</h2>
        </header>
        {alertsLogin.length > 0 &&
          alertsLogin.map((alrt) => <Alert alrt={alrt} key={alrt.id} />)}
        <main>
          <InputItem
            name="username"
            value={state.username}
            onChange={onChange}
            type="text"
          />
          <InputItem
            name="password"
            value={state.password}
            onChange={onChange}
            type="password"
          />
          <a href="/resetpassword" className="reset-password">
            Reset Password
          </a>
        </main>
        <button className="btn" onClick={onClick}>
          LogIn
        </button>
      </div>
    </form>
  );
};
export default Card;
