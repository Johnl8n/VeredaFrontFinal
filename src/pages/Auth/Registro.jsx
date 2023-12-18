import { useState, useContext } from "react";

import style from "./Registro.module.css";

import { Link } from "react-router-dom";

import { Context } from "../../context/UserContext";

import { toast } from "react-toastify";

const Registro = () => {
  const [user, setUser] = useState({});
  const [ConfimSenha, setConfimSenha] = useState(true);

  const { register } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(user);

    register(user);
  }

  return (
    <section className={style.section}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1>Registro</h1>
        <div>
          <label>CPF</label>
          <input
            className={style.input}
            type="text"
            name="cpf"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Nome</label>
          <input
            className={style.input}
            type="text"
            name="nome"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            className={style.input}
            type="email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            className={style.input}
            type="password"
            name="senha"
            onChange={handleChange}
          />
        </div>

        {!ConfimSenha && <p>Senhas Incompatíveis</p>}

        <div>
          <label>Confirmar Senha</label>
          <input
            className={style.input}
            type="password"
            name="confirmarSenha"
            onChange={handleChange}
          />
        </div>

        <input className={style.input} type="submit" value="Cadastrar" />
      </form>
      <p className={style.paragrafo}>
        Já tem conta?{" "}
        <Link className={style.link} to="/login">
          Clique aqui.
        </Link>
      </p>
    </section>
  );
};

export default Registro;
