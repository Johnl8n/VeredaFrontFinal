import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import NavBar from "../../components/Elements/NavBar";
import style from "./Orcamento.module.css";

import { BiShow } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

const Orcamento = () => {
  const navegate = useNavigate();
  const [idsProdutos, setIdsProdutos] = useState([]);
  const [produtosOrcados, setProdutosOrcados] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const calcularValorTotal = () => {
      let total = 0;
      produtosOrcados.forEach((produto, index) => {
        const quantidade = idsProdutos[index].quantidade;
        total += quantidade * produto.preco;
      });
      setValorTotal(total);
    };

    calcularValorTotal();
  }, [produtosOrcados, idsProdutos]);

  useEffect(() => {
    const local_id = JSON.parse(localStorage.getItem("ProdutosOrcados"));

    if (local_id) {
      setIdsProdutos(local_id);
    }
  }, []);

  useEffect(() => {
    const fetchProdutosOrcados = async () => {
      if (idsProdutos.length > 0) {
        try {
          const promises = idsProdutos.map(async (element) => {
            try {
              const response = await api.get(`/produtos/search/${element.id}`);
              return response.data.produto;
            } catch (error) {
              console.error("Error fetching data:", error);
              return null;
            }
          });

          const produtos = await Promise.all(promises);
          setProdutosOrcados(produtos.filter((produto) => produto !== null));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchProdutosOrcados();
  }, [idsProdutos]);

  const verProduto = (id) => {
    navegate(`/produto/${id}`);
  };

  const removeProduto = (id) => {
    try {
      const produtosFiltrados = produtosOrcados.filter((produto) => {
        return produto.id != id;
      });

      setProdutosOrcados(produtosFiltrados);

      toast.success("Produto removido ");

      const local_id =
        JSON.parse(localStorage.getItem("ProdutosOrcados")) || [];
      const local_filtrado = local_id.filter((element) => element.id != id);
      localStorage.setItem("ProdutosOrcados", JSON.stringify(local_filtrado));
      setIdsProdutos(local_filtrado);
    } catch (error) {
      toast.error("Erro ao remover ");
    }
  };

  return (
    <div className={style.body}>
      <NavBar />

      <div className={style.container}>
        <h2>Meus Orcamentos</h2>
        <div className={style.div_table}>
          <table className={style.table}>
            <thead>
              <tr>
                <th>Fornecedor</th>
                <th>Situação</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Material</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {console.log(produtosOrcados)}
              {produtosOrcados.length > 0 &&
                produtosOrcados.map((produto, index) => {
                  return (
                    <tr key={produto.id}>
                      <td>{produto.empresa.nome}</td>
                      <td>Em Estoque</td>
                      <td>{idsProdutos[index].quantidade}</td>
                      <td>{produto.preco}</td>
                      <td>{new Date().toLocaleDateString()}</td>
                      <td>{produto.produto.nome}</td>
                      <td className={style.actions}>
                        <BiShow onClick={() => verProduto(produto.id)} />
                        <MdOutlineEdit values={produto.id} />
                        <FaRegTrashAlt
                          onClick={() => removeProduto(produto.id)}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className={style.div_infos}>
          <p>R$ {valorTotal}</p>
          <button className={style.button_save}>Salvar</button>
        </div>
      </div>
    </div>
  );
};

export default Orcamento;
