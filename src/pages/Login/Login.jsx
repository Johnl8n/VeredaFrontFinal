import { useState, useContext } from "react";

import Container from "../../components/Elements/Container";

import { Context } from "../../context/UserContext";

import { Link } from "react-router-dom";

import style from "./Login.module.css";

const LoginEmpresa = () => {
  const [empresa, setEmpresa] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {
    setEmpresa({ ...empresa, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(empresa);
  };

  return (
    <Container>
      <section className={style.section}>
        <div>
          <h2 className={style.h2}>Login</h2>
        </div>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.container_input}>
            <label htmlFor="email">Email</label>
            <input type="email" required name="email" onChange={handleChange} />
          </div>

          <div className={style.container_input}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              required
              name="senha"
              onChange={handleChange}
            />
          </div>

          <div className={style.buton}>
            <button className={style.button} type="submit">
              Entrar
            </button>
          </div>
        </form>
        <p className={style.paragrafo}>
          Não tem conta?{" "}
          <Link className={style.Link} to="/choiceuser">
            Clique aqui.
          </Link>
        </p>
      </section>
    </Container>
  );
};

export default LoginEmpresa;
