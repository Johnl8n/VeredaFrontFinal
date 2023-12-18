import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiShow } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Elements/NavBar";
import style from "./Orcamento.module.css";
import api from "../../utils/api";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const Orcamento = () => {
  const navigate = useNavigate();
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
    navigate(`/produto/${id}`);
  };

  const removeProduto = (id) => {
    try {
      const produtosFiltrados = produtosOrcados.filter((produto) => produto.id != id);

      setProdutosOrcados(produtosFiltrados);

      toast.success("Produto removido ");

      const local_id = JSON.parse(localStorage.getItem("ProdutosOrcados")) || [];
      const local_filtrado = local_id.filter((element) => element.id != id);
      localStorage.setItem("ProdutosOrcados", JSON.stringify(local_filtrado));
      setIdsProdutos(local_filtrado);
    } catch (error) {
      toast.error("Erro ao remover ");
    }
  };

  const gerarPDF = () => {
    // const logo = "logonew.png";
    
    const docDefinition = {
      // background: [
      //   {
      //     image: logo,
      //     width: 300,
      //   }
      // ],
      content: [
        { text: "Meu orçamento", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [{ text: 'Fornecedor', style: 'tableHeader' },
               { text: 'Situação', style: 'tableHeader' },
               { text: 'Quantidade', style: 'tableHeader' },
               { text: 'Valor', style: 'tableHeader' },
               { text: 'Data', style: 'tableHeader' },
               { text: 'Material', style: 'tableHeader' }],
              ...produtosOrcados.map((produto, index) => [
                produto.empresa.nome,
                "Em Estoque",
                idsProdutos[index].quantidade,
                { text: `R$ ${produto.preco}`, alignment: 'right' },
                new Date().toLocaleDateString(),
                produto.produto.nome,
              ]),
            ],
          },
        },
        { text: `\nTotal: R$ ${valorTotal.toFixed(2)}`, style: "total" },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
        total: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 0],
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  };

  return (
    <div className={style.body}>
      <NavBar />
      <div className={style.container}>
        <h2>Meus Orçamentos</h2>
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
              {produtosOrcados.length > 0 &&
                produtosOrcados.map((produto, index) => (
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
                      <FaRegTrashAlt onClick={() => removeProduto(produto.id)} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={style.div_infos}>
          <p>R$ {valorTotal.toFixed(2)}</p>
          <button onClick={gerarPDF} className={style.button_save} type="button">
            Gerar PDF <img src="public/file-pdf-solid.svg" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orcamento;
