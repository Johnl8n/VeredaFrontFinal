import stylecss from "./ProdutosCard.module.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

const ProdutosCard = () => {
  const [produto, setProduto] = useState([]);
  const [UrlImagem, setUrlImagem] = useState(import.meta.env.VITE_URL_API);

  useEffect(() => {
    api.get("/empresas/all/produto").then((response) => {
      setProduto(response.data.produto);
    }).catch((error) => {
      console.error('Erro na chamada da API:', error);
    });
  }, [UrlImagem]);

  return (
    <div className={stylecss.container}>
      <div className={stylecss.filtros}>
        <h1>Produtos</h1>
        <div className={stylecss.selecao}>
          <select name="" id={stylecss.diferente}>
            <option>Local</option>
            <option>Sinapi</option>
          </select>
        </div>
      </div>

      <div className={stylecss.produtos}>
        {produto.length > 0 &&
          produto.map((item) => (
            <div className={stylecss.card} key={item.id}>
              <div
                className={stylecss.div_img}
                style={{
                  backgroundImage: `url(${UrlImagem}imagens/produto_empresa/${item.imagem})`,
                }}
              />
              <div className={stylecss.div_infos}>
                <p id={stylecss.nome}>{item.produto.nome}</p>
                <p id={stylecss.precinho}>R$ {item.preco}</p>
              </div>
              <div className={stylecss.descricao}>
                <p>{item.descricao}</p>
              </div>
              <div className={stylecss.info_empresa}>
                <p id={stylecss.empresa}>Empresa: {item.empresa.nome}</p>
              </div>
              <div className={stylecss.ver_mais}>
                <Link
                  className={stylecss.button_ver_mais}
                  to={`/produto/${item.id}`}
                >
                  Ver mais
                </Link>
              </div>
            </div>
          ))}
      </div>

      {produto.length === 0 && <p>Não há produtos!!!</p>}
    </div>
  );
};

export default ProdutosCard;
