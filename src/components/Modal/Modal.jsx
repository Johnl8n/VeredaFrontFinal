import React, { useContext, useState } from "react";
import style from "./Modal.module.css";
import { Context } from "../../context/UserContext";

const Modal = ({ exit, reloadPage, id }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("token")) || []
  );
  const [produto, setProduto] = useState({});
  const { atualizar_produto } = useContext(Context);

  const onSubmit = (e) => {
    e.preventDefault();
    atualizar_produto(token, produto, reloadPage, id);
    exit();
  };

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const FileChange = (e) => {
    setProduto({ ...produto, imagem: e.target.files[0] });
  };

  return (
    <div className={style.modalContainer}>
      <form onSubmit={onSubmit} className={style.modal}>
        <div className={style.modalText}>
          <div className={style.input}>
            <label>Preco</label>
            <input type="text" name="preco" onChange={handleChange} />
          </div>
          <div className={style.input}>
            <label>Quantidade</label>
            <input type="number" name="quantidade" onChange={handleChange} />
          </div>
          <div className={style.input}>
            <label>Descrição</label>
            <input type="text" name="descricao" onChange={handleChange} />
          </div>
          <div>
            <input
              type="file"
              name="imagem"
              className={style.input}
              onChange={FileChange}
            />
          </div>
        </div>
        <div className={style.btn}>
          <div>
            <button onClick={exit} className={style.btnCancelar}>
              Cancelar
            </button>
            <button type="submit" className={style.btnConfirmar}>
              Confirmar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Modal;
