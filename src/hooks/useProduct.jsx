import { useEffect } from "react";
import api from "../utils/api";

import { useNavigate } from "react-router-dom";
import notify from "../utils/notificacao";
import { formToJSON } from "axios";

const useProduct = () => {
  const navegate = useNavigate();

  async function create(produto) {
    try {
      const data = await api
        .post("/empresas/create/produto", produto, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          return response.data;
        });

      console.log(data);
      navegate("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function create_orcamento(orcamento) {
    try {
      const data = await api
        .post("/orcamentos/create", orcamento)
        .then((response) => {
          return response.data;
        });

      notify("Item adicionado ao orcamento!", "success");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function atualizar_produto(token, produto, reloadPage, id) {
    const formData = new FormData();

    const app = await Object.keys(produto).forEach((key) => {
      if (key == "imagem") {
        formData.append("imagem", produto[key]);
      } else {
        formData.append(key, produto[key]);
      }
      console.log(("imagem", produto[key]));
    });

    try {
      await api.put(`/produtos/update/produto-empresa/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      notify("Produto Atualizado", "success");
      reloadPage();
    } catch (error) {
      notify("Erro ao Atualizar", "error");
    }
  }

  return { create, create_orcamento, atualizar_produto };
};

export default useProduct;
