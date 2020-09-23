import React from "react";
import { func, string } from "prop-types";

import "./TextInput.scss";

function TextInput({ label, name, onChange, value }) {
  return (
    <label htmlFor={name} className="text-field">
      <span className="text-field__label">{label}</span>
      <input
        className="text-field__input"
        onChange={onChange}
        value={value}
        type="text"
        name={name}
        id={name}
      />
    </label>
  );
}

TextInput.propTypes = {
  label: string,
  name: string.isRequired,
  onChange: func.isRequired,
  value: string.isRequired,
};

export default TextInput;
