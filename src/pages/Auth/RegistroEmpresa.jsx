import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../../context/UserContext"; // Certifique-se de que o caminho está correto
import style from "./Registro.module.css";

const Registro = () => {

  const { registerEmpresa } = useContext(Context);

  const [user, setUser] = useState({});
  const [confirmaSenha, setConfirmaSenha] = useState(true);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // if (user.senha !== user.confirmarSenha) {
    //   setConfirmaSenha(false);
    //   return;
    // }

    console.log("registerEmpresa:", registerEmpresa); // Adicione esta linha

    registerEmpresa(user)
    //   .then(() => {
    //     toast.success("Cadastro de empresa realizado com sucesso!");
    //   })
    //   .catch((error) => {
    //     toast.error(`Erro ao cadastrar empresa: ${error.message}`);
    //   });
  }

  return (
    <section className={style.section}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1>Registro</h1>
        <div>
          <label>CNPJ</label>
          <input
            className={style.input}
            type="text"
            name="cnpj"
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
          <label>Telefone</label>
          <input
            className={style.input}
            type="text"
            name="telefone"
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

        {!confirmaSenha && <p>Senhas Incompatíveis</p>}

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
