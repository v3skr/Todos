import React from "react";
import ReactDOM from "react-dom";
import AlertState from "./context/Alerts/AlertState";
import AuthState from "./context/Auth/AuthState";
import TodosState from "./context/Todos/TodosState";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AlertState>
        <TodosState>
          <AuthState>
            <App />
          </AuthState>
        </TodosState>
      </AlertState>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
