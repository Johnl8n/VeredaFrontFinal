import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import stylecss from "../pages/Search.module.css";
import api from "../utils/api";
import NavBar from "../components/Elements/NavBar";

const Search = () => {
    const [UrlImagem, setUrlImagem] = useState(import.meta.env.VITE_URL_API);
    const [searchParams] = useSearchParams();

    const [produtos, setProdutos] = useState([]);

    const query = searchParams.get("q"); // Corrigido para "nome" ao invés de "q"
    console.log(query);
    useEffect(() => {
        api.get(`/empresas/produto/search?nome=${query}`).then((response) => {
          setProdutos(response.data.produto);
        }).catch((error) => {
          console.error('Erro na chamada da API:', error);
        });
    }, [UrlImagem, query]); // Adicionado "query" como dependência

    return (
        <>
        <NavBar />

        <div className={stylecss.container}>
            <div className={stylecss.filtros}>
                <h1>Resultados da pesquisa para: {query}</h1>
                <div className={stylecss.selecao}>
                    <select name="" id={stylecss.diferente}>
                        <option>Local</option>
                        <option>Sinapi</option>
                    </select>
                </div>
            </div>
        

            <div className={stylecss.produtos}>
                {produtos.length > 0 &&
                    produtos.map((item) => (
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
                    ))
                }
            </div>
        {produtos.length === 0  && <p>Não foi encontrado nenhum produto com o nome {query}</p>}
    </div>
        </>
    );
};

export default Search;
