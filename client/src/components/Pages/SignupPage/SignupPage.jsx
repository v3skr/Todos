import React from "react";
import "../LoginPage/LoginPage.scss";
import Card from "./Card";

const SignupPage = () => {
  return (
    <div className="home-page">
      <div className="login-header">
        <h1>Sign Up To Save All Your TODOs</h1>
      </div>
      <Card />
    </div>
  );
};

export default SignupPage;
