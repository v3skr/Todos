import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Alert from "../../utils/Alert/Alert";
import "./AccountPage.scss";
import AuthContext from "../../../context/Auth/AuthContext";
import AlertContext from "../../../context/Alerts/AlertContext";
import Inputitem from "./Inputitem";
import TodosContext from "../../../context/Todos/TodosContext";
import Loading from "../../utils/Loading";

const AccountPage = () => {
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.token) history.push("/");
  });
  const { alertsAccount } = useContext(AlertContext);
  const { isLoading } = useContext(TodosContext);
  const { updateAccount, loadUser, user } = useContext(AuthContext);
  useEffect(() => {
    async function callDate() {
      await loadUser();
    }
    callDate();
  }, []);
  let alertStyle;
  const [state, setState] = useState({
    Email: "",
    username: "",
    password: "",
    password2: "",
  });
  const [config, setConfig] = useState({
    isPassword: false,
    inEdit: false,
  });
  config.isPassword
    ? (alertStyle = {
        top: "100px",
      })
    : (alertStyle = {
        top: "180px",
      });
  const onChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const passToggle = () =>
    setConfig({ ...config, isPassword: !config.isPassword });
  const editToggle = () =>
    setConfig({ ...config, inEdit: !config.inEdit, isPassword: false });
  const onClick = () => updateAccount();
  return isLoading ? (
    <Loading />
  ) : (
    <div className="account-page">
      {alertsAccount.length > 0 &&
        alertsAccount.map((alrt) => (
          <Alert style={alertStyle} alrt={alrt} key={alrt.id} />
        ))}
      <div className="input-con">
        <h1>Edit Your Account Details</h1>
        <Inputitem
          inEdit={config.inEdit}
          onChange={onChange}
          label="Email"
          value={user ? user.Email : ""}
          type="email"
          name="Email"
        />
        <Inputitem
          inEdit={config.inEdit}
          onChange={onChange}
          label="Username"
          value={user ? user.username : ""}
          type="text"
          name="username"
        />
        {config.isPassword && (
          <Inputitem
            inEdit={config.inEdit}
            onChange={onChange}
            label="New Password"
            type="password"
            name="password"
          />
        )}
        {config.isPassword && (
          <Inputitem
            inEdit={config.inEdit}
            onChange={onChange}
            label="Confirm Password"
            type="password"
            name="password2"
          />
        )}
        {config.inEdit ? (
          !config.isPassword ? (
            <h4 onClick={passToggle}>Enable Password Edit</h4>
          ) : (
            <h4 onClick={passToggle}>Disable Password Edit</h4>
          )
        ) : (
          ""
        )}
        {config.inEdit ? (
          <div className>
            <button className="btn" onClick={onClick}>
              Update
            </button>
            <button className="btn" onClick={editToggle}>
              Cancel
            </button>
          </div>
        ) : (
          <button className="btn" onClick={editToggle}>
            Edit Account
          </button>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
