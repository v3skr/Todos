import React from "react";
import "./AccountPage.scss";

const Inputitem = ({ inEdit, label, type = "text", data, name, onChange }) => {
  return (
    <div className="input-item">
      <div className="label">{label}:</div>
      {inEdit ? (
        <input type={type} name={name} onChange={onChange} />
      ) : (
        <h1>{data}</h1>
      )}
    </div>
  );
};

export default Inputitem;
