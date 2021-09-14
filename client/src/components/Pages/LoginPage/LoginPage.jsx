import React from "react";
import Card from "./Card/Card";
import "./LoginPage.scss";

const LoginPage = () => {
  return (
    <div className="home-page">
      <div className="login-header">
        <h1>Login To View All Your Todos</h1>
      </div>
      <Card />
    </div>
  );
};

export default LoginPage;
