import React from "react";

export const Button = ({ children, fn }) => {
  return (
    <button className="button" onClick={fn ? fn : null}>
      {children}
    </button>
  );
};
