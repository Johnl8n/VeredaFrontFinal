import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../utils/notificacao";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navegate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function register(user) {
    try {
      const data = await api
        .post("/usuarios/registro", user)
        .then((response) => {
          return response.data;
        });

      notify("Registro realizado com sucesso", "success");

      setTimeout(async () => {
        await authUser(data);
      }, 500);
    } catch (error) {
      notify(error.response.data.message, "error");
    }
  }

  async function registerEmpresa(user) {
    try {
      const data = await api
        .post("/empresas/create", user)
        .then((response) => {
          return response.data;
        });


      notify("Registro realizado com sucesso", "success");

      setTimeout(async () => {
        await authUser(data);
      }, 500);
    } catch (error) {
      notify(error.response.data.message, "error");
    }
  }

  async function login(user) {
    try {
      const data = await api.post("/login", user).then((response) => {
        return response.data;
      });

      notify("Login realizado com sucesso", "success");

      setTimeout(async () => {
        await authUser(data);
      }, 500);
    } catch (error) {
      notify(error.response.data.message, "error");
    }
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data));
    navegate("/");
  }

  function logout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    navegate("/login");
  }

  return { authenticated, loading, register, login, logout, registerEmpresa, notify };
};

export default useAuth;
