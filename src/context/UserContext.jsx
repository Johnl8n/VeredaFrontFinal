import React, { createContext } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";

const Context = createContext();

function UserContext({ children }) {
  const { authenticated, loading, register, registerEmpresa, login, logout } = useAuth();
  const { create, create_orcamento, atualizar_produto } = useProduct();

  return (
    <Context.Provider
      value={{
        loading,
        authenticated,
        register,
        registerEmpresa,
        login,
        logout,
        create,
        create_orcamento,
        atualizar_produto,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, UserContext };
