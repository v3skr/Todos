import React, { useState, useContext } from "react";
import Alert from "../../utils/Alert/Alert";
import "./AccountPage.scss";
import AuthContext from "../../../context/Auth/AuthContext";
import AlertContext from "../../../context/Alerts/AlertContext";
import Inputitem from "./Inputitem";

const AccountPage = () => {
  const { updateAccount } = useContext(AuthContext);
  const { alertsAccount } = useContext(AlertContext);
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
  return (
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
          data="v3sk@yahoo.com"
          type="email"
          name="Email"
        />
        <Inputitem
          inEdit={config.inEdit}
          onChange={onChange}
          label="Username"
          data="v3skr"
          type="text"
          name="username"
        />
        {config.isPassword && (
          <Inputitem
            inEdit={config.inEdit}
            onChange={onChange}
            label="New Password"
            data="password"
            type="password"
            name="password"
          />
        )}
        {config.isPassword && (
          <Inputitem
            inEdit={config.inEdit}
            onChange={onChange}
            label="Confirm Password"
            data="password2"
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
