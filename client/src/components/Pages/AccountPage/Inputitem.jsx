import React from "react";
import "./AccountPage.scss";

const Inputitem = ({ inEdit, label, type = "text", value, name, onChange }) => {
  return (
    <div className="input-item">
      <div className="label">{label}:</div>
      {inEdit ? (
        <input type={type} name={name} onChange={onChange} value={value} />
      ) : (
        <h1>{value}</h1>
      )}
    </div>
  );
};

export default Inputitem;
