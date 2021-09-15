import React from "react";
import "./ResetPassPage.scss";

const ResetPassPage = () => {
  return (
    <div className="reset-pass">
      {true ? (
        <div className="input-item">
          <h1>Enter Email Used In Your Account</h1>
          <div>
            <label htmlFor="">Enter Email</label>
          </div>
          <input type="text" />
          <button className="btn">Send Email</button>
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
