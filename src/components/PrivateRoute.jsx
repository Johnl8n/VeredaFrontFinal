import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { authenticated } = useContext(Context);

  return authenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
