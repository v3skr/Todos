import React from "react";
import ReactDOM from "react-dom";
import AlertState from "./context/Alerts/AlertState";
import AuthState from "./context/Auth/AuthState";
import TodosState from "./context/Todos/TodosState";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AlertState>
      <TodosState>
        <AuthState>
          <App />
        </AuthState>
      </TodosState>
    </AlertState>
  </React.StrictMode>,
  document.getElementById("root")
);
