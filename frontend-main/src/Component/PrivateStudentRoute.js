import React from "react";
import { Navigate } from "react-router-dom";

const PrivateStudentRoute = ({ children }) => {
  const studentUser = localStorage.getItem("studentUser");
  const role = localStorage.getItem("role");

  if (studentUser && role === "student") {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateStudentRoute;
