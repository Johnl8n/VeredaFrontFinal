import React, { useState, useContext, useEffect } from "react";
import api from "../../utils/api";
import style from "./Cadastro.module.css";
import { Context } from "../../context/UserContext";

const Cadastro = () => {
  const { create } = useContext(Context);
  const [produto, setProduto] = useState({});
  const [produtosapi, setprodutosapi] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    api.get("/produtos/all").then((response) => {
      setprodutosapi(response.data);
    });

    setToken(JSON.parse(localStorage.getItem("token")));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(produto);
    create(produto);
  };

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const FileChange = (e) => {
    setProduto({ ...produto, imagem: e.target.files[0] });
  };

  const handleSelectChange = (e) => {
    const produto_id = e.target.value;
    const produtoSelecionado = produtosapi.find(
      (produto) => produto.id === parseInt(produto_id)
    );
    setProduto({
      ...produto,
      unidade: produtoSelecionado.unidade,
      especificacoes: produtoSelecionado.especificacoes,
      produtoId: produtoSelecionado.id,
      empresaId: token.usercnpj,
    });
  };

  return (
    <div className={style.container}>
      <h1>Cadastro de Produto</h1>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.form_group}>
          <label htmlFor="produto" className={style.label}>
            Produto
          </label>
          <select
            name="nome"
            onChange={handleSelectChange}
            className={style.select}
          >
            <option>Selecione um produto</option>
            {produtosapi.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome}
              </option>
            ))}
          </select>
        </div>

        <div className={style.form_group}>
          <label htmlFor="unidade" className={style.label}>
            Unidade
          </label>
          <br />
          <input
            type="text"
            value={produto.unidade || "----"}
            disabled
            className={style.input}
          />
        </div>

        <div className={style.form_group}>
          <label htmlFor="especificacoes" className={style.label}>
            Especificações
          </label>
          <br />
          <textarea
            type="text"
            value={produto.especificacoes || "----"}
            disabled
            rows="4"
            cols="50"
            className={style.textarea}
          />
        </div>

        <div className={style.form_group}>
          <label htmlFor="preco" className={style.label}>
            Preço
          </label>
          <br />
          <input
            type="text"
            name="preco"
            className={style.input}
            onChange={handleChange}
          />
        </div>

        <div className={style.form_group}>
          <label htmlFor="quantidade" className={style.label}>
            Quantidade
          </label>
          <br />
          <input
            type="text"
            name="quantidade"
            className={style.input}
            onChange={handleChange}
          />
        </div>

        <div className={style.form_group}>
          <label htmlFor="descricao" className={style.label}>
            Descricão
          </label>
          <br />
          <textarea
            type="text"
            rows="4"
            cols="50"
            name="descricao"
            className={style.textarea}
            onChange={handleChange}
          />
        </div>

        <div className={style.form_group}>
          <input
            type="file"
            name="imagem"
            className={style.input}
            onChange={FileChange}
          />
        </div>

        <div className={style.form_group}>
          <label htmlFor="cnpj" className={style.label}>
            CNPJ
          </label>
          <br />
          <input
            type="text"
            name="empresaId"
            value={token?.usercnpj || ""}
            className={style.input}
            disabled
          />
        </div>

        <button type="submit" className={style.button}>
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default Cadastro;
