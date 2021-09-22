import React from "react";
import "../LoginPage/LoginPage.scss";
import Loading from "../../utils/Loading";
import Card from "./Card";
import TodosContext from "../../../context/Todos/TodosContext";

const SignupPage = () => {
  const { isLoading } = React.useContext(TodosContext);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="home-page">
      <div className="login-header">
        <h1>Sign Up To Save All Your TODOs</h1>
      </div>
      <Card />
    </div>
  );
};

export default SignupPage;
