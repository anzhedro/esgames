import React from "react";

export const Avatar = ({ link = "https://avatars0.githubusercontent.com/u/17098477?s=460&v=4" }) => {
  return (
    <div className="avatar">
      <img src={link} alt="avatar" />
    </div>
  );
};
