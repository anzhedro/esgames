import { observer } from "mobx-react-lite";
import React from "react";
import { store } from "../store/store";

export const Input = observer(({ id, placeholder, fn, text = "" }) => {
  return (
    <input
      className={
        "input " + (store.auth.login_status === "fail" ? "input--error" : "")
      }
      type="text"
      id={id}
      value={text}
      onChange={(e) => fn(e)}
      placeholder={placeholder}
    />
  );
});
