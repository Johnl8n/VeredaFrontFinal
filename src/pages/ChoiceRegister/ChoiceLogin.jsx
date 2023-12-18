import React from "react";
import { Link } from "react-router-dom";

import style from "./ChoiceLogin.module.css";

const ChoiceLogin = () => {
  return (
    <div className={style.container}>
      <h1>Quem é você?</h1>
      <div className={style.links}>
        <Link to={"/usuario/register"} className={style.buton_link}>
          Usuario
        </Link>
        <Link to={"/empresa/register"} className={style.buton_link}>
          Empresa
        </Link>
      </div>
    </div>
  );
};

export default ChoiceLogin;
