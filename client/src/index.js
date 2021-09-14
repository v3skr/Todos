import React from "react";
import ReactDOM from "react-dom";
import AlertState from "./context/Alerts/AlertState";
import AuthState from "./context/Auth/AuthState";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <AlertState>
      <AuthState>
        <App />
      </AuthState>
    </AlertState>
  </React.StrictMode>,
  document.getElementById("root")
);
