import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import stylecss from "./MeusProdutos.module.css";
import { BiShow } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import notify from "../../utils/notificacao";
import NavBar from "../../components/Elements/NavBar";
import Modal from "../../components/Modal/Modal";

const MeusProdutos = () => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || []
  );
  const [produto, setProduto] = useState([]);
  const [UrlImagem, setUrlImagem] = useState(import.meta.env.VITE_URL_API);
  const [modal, setModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [produtoId, setProdutoId] = useState(null);

  const navegate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await api.get("/empresas/token/check", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      const cnpj = response.data.currentUser.cnpj.replace(/\D/g, "");

      const findprodutos = await api.get(`/empresas/produto/${cnpj}`);
      setProduto(findprodutos.data.produto);
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token.token, reload]);

  const reloadPage = () => {
    setReload(!reload);
  };

  const verProduto = (id) => {
    navegate(`/produto/${id}`);
  };

  const modificarProduto = (id) => {
    setModal(!modal);
    setProdutoId(id);
  };

  const deletarProduto = async (id) => {
    await api.delete(`/empresas/delete/produto/${id}`);
    notify("Produto deletado", "success");
    fetchData();
  };

  return (
    <>
      {modal ? (
        <Modal exit={modificarProduto} reloadPage={reloadPage} id={produtoId} />
      ) : null}
      <NavBar />
      <h2>Meus Produtos</h2>
      <div className={stylecss.produtos}>
        {produto.length > 0 &&
          produto.map((produto) => (
            <div className={stylecss.card} key={produto.id}>
              <div
                className={stylecss.div_img}
                style={{
                  backgroundImage: `url(${UrlImagem}imagens/produto_empresa/${produto.imagem})`,
                }}
              />
              <div className={stylecss.div_infos}>
                <p id={stylecss.nome}>{produto.produto.nome}</p>
                <p id={stylecss.precinho}>R$ {produto.preco}</p>
              </div>
              <div className={stylecss.descricao}>
                <p>{produto.descricao}</p>
              </div>
              <div className={stylecss.div_infos}>
                <p>Estoque: {produto.quantidade}</p>
              </div>
              <div className={stylecss.info}>
                <BiShow
                  onClick={() => verProduto(produto.id)}
                  style={{ cursor: "pointer" }}
                />
                <MdOutlineEdit
                  onClick={() => modificarProduto(produto.id)}
                  style={{ cursor: "pointer" }}
                />
                <FaRegTrashAlt
                  onClick={() => deletarProduto(produto.id)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))}
      </div>

      {produto.length === 0 && <p>Não há produtos!!!</p>}
    </>
  );
};

export default MeusProdutos;
