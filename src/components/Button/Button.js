import React from "react";
import classNames from "classnames";
import { func, string } from "prop-types";

import "./Button.scss";

function Button({ children, onClick, type = "button", variant = "primary" }) {
  return (
    <button
      className={classNames("button", {
        "button--primary": variant === "primary",
        "button--secondary": variant === "secondary",
      })}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: string,
  onClick: func,
  type: string,
  variant: string,
};

export default Button;
