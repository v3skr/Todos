import React, { useContext, useState } from "react";
import AuthContext from "../../../context/Auth/AuthContext";
import AlertContext from "../../../context/Alerts/AlertContext";
import "./ResetPassPage.scss";

const ResetPassPage = () => {
  const { changePass } = useContext(AuthContext);
  const { alertsChangePass } = useContext(AlertContext);
  const [state, setState] = useState({
    Email: "",
    isSent: false,
  });
  const onChange = (e) => setState({ ...state, Email: e.target.value });
  const onClick = () => {
    changePass(state.Email);
  };
  return (
    <div className="reset-pass">
      {true ? (
        <div className="input-item">
          <h1>Enter Email Used In Your Account</h1>
          {alertsChangePass.length > 0 &&
            alertsChangePass.map((alrt) => (
              <div className="alert" key={alrt.id}>
                {alrt.msg}
              </div>
            ))}
          <div className="label">
            <label htmlFor="Email">Enter Email</label>
          </div>
          <input
            type="text"
            name="Email"
            onChange={onChange}
            value={state.Email}
          />
          <button className="btn" onClick={onClick}>
            Send Email
          </button>
        </div>
      ) : (
        <div className="success">
          <h1>Email Sent Check Your Inbox For Further Insructions</h1>
          <i className="far fa-check-circle fa-5x"></i>
        </div>
      )}
    </div>
  );
};

export default ResetPassPage;
