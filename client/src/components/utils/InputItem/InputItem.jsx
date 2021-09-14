import React from "react";
import "./InputItem.scss";

const InputItem = ({ name, value, onChange, type = "text" }) => {
  return (
    <div className="input-item">
      <label htmlFor={name}>
        {name.slice(0, 1).toUpperCase() + name.slice(1)} :
      </label>
      <input type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
};

export default InputItem;
