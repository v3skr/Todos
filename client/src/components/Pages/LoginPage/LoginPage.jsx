import React, { useContext } from "react";
import Card from "./Card/Card";
import Loading from "../../utils/Loading";
import TodosContext from "../../../context/Todos/TodosContext";
import "./LoginPage.scss";

const LoginPage = () => {
  const { isLoading } = useContext(TodosContext);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="home-page">
      <div className="login-header">
        <h1>Login To View All Your Todos</h1>
      </div>
      <Card />
    </div>
  );
};

export default LoginPage;
