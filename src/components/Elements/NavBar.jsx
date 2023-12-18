import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/UserContext";
import style from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";


const NavBar = () => {
  const [search, setSearch] = useState("");
  const { logout, authenticated } = useContext(Context);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const hadleSubmit = (e) => {
    e.preventDefault();
    
    if (!search) return;
    // console.log(search);
    navigate(`/search?q=${search}`);
    setSearch("");
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("token"));
    setCurrentUser(storedUser);
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    logout();
  };

  return (
    <div className={style.navbar}>
      <div className={style.logo}>
        <h1>
          <Link className={style.link_logo} to="/">
            <img src="VeredaLogo.png" alt="" />
          </Link>
        </h1>
        <select className={style.select}>
          <option className={style.option} value="">
            Meus Produtos
          </option>
        </select>
      </div>
      <div className={style.search}>
        <form onSubmit={hadleSubmit}>
          <input
            className={style.input}
            type="text"
            placeholder="Pesquisar"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          ></input>
          <button type = "submit" className={style.button}>Pesquisar</button>
        </form>
      </div>
      <ul>
        {!authenticated ? (
          <>
            <li>
              <Link to="/login" className={style.linkando}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/choiceuser" className={style.linkando}>
                Registro
              </Link>
            </li>
          </>
        ) : (
          <>
            {currentUser?.usercnpj ? (
              <>
                <li>
                  <Link to={`/meusprodutos`} className={style.linkando}>
                    Meus Produtos
                  </Link>
                </li>
                <li>
                  <Link to="/cadastro/produto" className={style.linkando}>
                    Anunciar
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/orcamento" className={style.linkando}>
                  Orcamentos
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/login"
                className={style.linkando}
                onClick={handleLogout}
              >
                <MdExitToApp style={{ height: "100%", width: "100%" }} />
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
