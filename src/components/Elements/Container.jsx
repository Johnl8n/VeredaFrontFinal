import React from "react";
import style from "./Container.module.css";

const Container = ({ children }) => {
  return <div className={style.main}> <div className={style.body}>{children}</div> </div>;
};

export default Container;
