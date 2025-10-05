import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/Context";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user && user.role === "admin" ? children : <Navigate to="/admin-login" />;
};

export default PrivateRoute;
