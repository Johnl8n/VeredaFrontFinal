import { UserContext } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute.jsx";
import ErrorPage from "./pages/Error/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Registro from "./pages/Auth/Registro.jsx";
import RegistroEmpresa from "./pages/Auth/RegistroEmpresa.jsx";
import Cadastro from "./pages/Empresa/Cadastro.jsx";
import Produto from "./pages/Produto/Produto.jsx";
import Orcamento from "./pages/Orcamento/Orcamento.jsx";
import ChoiceLogin from "./pages/ChoiceRegister/ChoiceLogin.jsx";
import MeusProdutos from "./pages/Empresa/MeusProdutos.jsx";
import Modal from "./components/Modal/Modal.jsx";
import Search from "./pages/Search.jsx";

function App() {
  return (
    <>
      <Router>
        <UserContext>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />} />
            <Route path="/usuario/register" element={<Registro />} />
            <Route path="/empresa/register" element={<RegistroEmpresa />} />
            <Route
              path="/cadastro/produto"
              element={
                <PrivateRoute>
                  <Cadastro />
                </PrivateRoute>
              }
            />
            <Route path="/produto/:id" element={<Produto />} />
            <Route path="/search" element={<Search/>}/>
            <Route path="/orcamento" element={<Orcamento />} />
            <Route path="/choiceuser" element={<ChoiceLogin />} />
            <Route path="/meusprodutos" element={<MeusProdutos />} />
            <Route path="/modal" element={<Modal />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </UserContext>
      </Router>
    </>
  );
}

export default App;
