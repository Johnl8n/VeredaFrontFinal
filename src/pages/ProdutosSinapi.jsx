import React, { useState, useEffect, useContext } from "react";

import api from "../utils/api";
import.meta.env.VITE_URL_API;
import VeredaLogo from '../../public/VeredaLogo.png'

// import { Context } from "../context/UserContext";

import { Link, json } from "react-router-dom";
import stylecss from "./Home.module.css";

import NavBar from "../components/Elements/NavBar";

// const { authenticated } = useContext(Context);

const ProdutosSinapi = () => {
  const [produto, setProduto] = useState([]);
  const [UrlImagem, setUrlImagem] = useState(import.meta.env.VITE_URL_API);

  useEffect(() => {
    api.get("/empresas/all/produto").then((response) => {
      setProduto(response.data.produto);
    });
  }, []);

  return (
    <>
      <NavBar />

      <div className={stylecss.container}>
        <div className={stylecss.filtros}>
          <h1>Produtos Sinapi</h1>
          <div className={stylecss.selecao}>
            {/* <select name="" id={stylecss.diferente}>
              <option>Local</option>
              <option>Sinapi</option>
            </select> */}

                <Link
                    className={stylecss.button_ver_mais}
                    to={`/`}
                >
                    Local
                </Link>

            {/* <select>
              <option value="">Selecione uma empresa</option>
            </select> */}
          </div>
        </div>

        <div className={stylecss.produtos}>
          {produto.length > 0 &&
            produto.map((produto) => (
              <div className={stylecss.card} key={produto.id}>
                <div
                  className={stylecss.div_img}
                  style={{
                    backgroundImage: `url(${VeredaLogo})`,
                  }}
                />
                <div className={stylecss.div_infos}>
                  <p id={stylecss.nome}>{produto.produto.nome}</p>
                  <p id={stylecss.precinho}>R$ {produto.preco}</p>
                </div>
                <div className={stylecss.descricao}>
                  <p>{produto.descricao}</p>
                </div>
                <div className={stylecss.info_empresa}>
                  <p id={stylecss.empresa}>Empresa: {produto.empresa.nome}</p>
                </div>
                <div className={stylecss.ver_mais}>
                  <Link
                    className={stylecss.button_ver_mais}
                    to={`/produto/${produto.id}`}
                  >
                    Ver mais
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {produto.length === 0 && <p>Não há produtos!!!</p>}
      </div>
    </>
  );
};

export default ProdutosSinapi;