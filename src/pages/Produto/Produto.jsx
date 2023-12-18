import api from "../../utils/api";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import style from "./Produto.module.css";
import NavBar from "../../components/Elements/NavBar";
import notify from "../../utils/notificacao";
import { BiShow } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const Produto = () => {
  const { id } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [UrlImagem, setUrlImagem] = useState(import.meta.env.VITE_URL_API);
  const [userToken, setUserToken] = useState(
    JSON.parse(localStorage.getItem("token"))
  );

  useEffect(() => {
    setLoading(true);
    setError(null);

    api
      .get(`/produtos/search/${id}`)
      .then((response) => {
        // console.log(response.data.produto);
        setProduto(response.data.produto);
        setLoading(false);
      })
      .catch((error) => {
        // console.error("Error fetching data:", error);
        setError("Erro ao carregar o produto.");
        setLoading(false);
      });
  }, [id]);

  const addOrcamento = (id) => {
    const localProducts =
      JSON.parse(localStorage.getItem("ProdutosOrcados")) || [];

    const isDuplicated = localProducts.some((element) => element.id === id);

    if (isDuplicated) {
      notify("Produto já adicionado", "info");
      return;
    }

    const newProduct = { id, quantidade };
    const updatedProducts = [...localProducts, newProduct];

    localStorage.setItem("ProdutosOrcados", JSON.stringify(updatedProducts));
    notify("Produto adicionado", "success");
  };

  const empresaadd = () => {
    notify("Empresas não podem realizar Orcamentos", "info");
  };

  const somar = () => {
    setQuantidade((quantidade) => quantidade + 1);
  };

  const diminuir = () => {
    if (quantidade > 1) {
      return setQuantidade((quantidade) => quantidade - 1);
    }
    return setQuantidade(1);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <NavBar />
      <div className={style.container}>
        <div className={style.container_img}>
          <div className={style.img_central}>
            <div
              className={style.img_central_img}
              style={{
                backgroundImage: `url(${UrlImagem}imagens/produto_empresa/${produto.imagem})`,
              }}
            />
          </div>
          <div className={style.carrosel}>
            <div
              className={style.c_img}
              style={{
                backgroundImage: `url(${UrlImagem}imagens/produto_empresa/${produto.imagem})`,
              }}
            />
            <div
              className={style.c_img}
              style={{
                backgroundImage: `url(${UrlImagem}imagens/produto_empresa/${produto.imagem})`,
              }}
            />
            <div
              className={style.c_img}
              style={{
                backgroundImage: `url(${UrlImagem}imagens/produto_empresa/${produto.imagem})`,
              }}
            />
          </div>
        </div>
        <div className={style.container_infos}>
          <h2>{produto.produto.nome}</h2>

          <div className={style.desc_card}>
            <p>{produto.descricao}</p>

            <div className={style.price_card}>
              <h3>R$ {produto.preco}</h3>
              <div className={style.quantidade}>
                <button className={style.button_quantidade} onClick={somar}>
                  +
                </button>

                <span>{quantidade}</span>

                <button
                  className={style.button_quantidade}
                  onClick={() => diminuir()}
                >
                  -
                </button>
              </div>
            </div>
          </div>

          <div className={style.div_buttons}>
            {userToken?.usercnpj ? (
              <Link className={style.button} onClick={empresaadd}>
                Adicionar a Orcamento
              </Link>
            ) : (
              <Link
                // to={`/orcamento`}
                className={style.button}
                onClick={() => addOrcamento(id)}
              >
                Adicionar a Orcamento
              </Link>
            )}
            {/* <p>ou</p>
            <Link className={style.button_2}>Comparar</Link> */}
          </div>
        </div>
      </div>
      <hr />
      <div className={style.especificacoes}>
        <h2>Especificações</h2>
        <div>{produto.descricao}</div>
      </div>
    </>
  );
};

export default Produto;
