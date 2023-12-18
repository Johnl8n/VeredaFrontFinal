import React from "react";
import style from "./ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={style.body}>
      <h1>OPS!</h1>
      <p>Page Not Found</p>
    </div>
  );
};

export default ErrorPage;
