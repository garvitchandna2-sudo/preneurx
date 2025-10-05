import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);   // The user object (admin/student/teacher)
  const [role, setRole] = useState(null);   // "admin" | "student" | "teacher"

  useEffect(() => {
    const savedAdmin = localStorage.getItem("adminUser");
    const savedStudent = localStorage.getItem("studentUser");
    const savedTeacher = localStorage.getItem("teacherUser");

    if (savedAdmin) {
      setUser(JSON.parse(savedAdmin));
      setRole("admin");
    } else if (savedStudent) {
      setUser(JSON.parse(savedStudent));
      setRole("student");
    } else if (savedTeacher) {
      setUser(JSON.parse(savedTeacher));
      setRole("teacher");
    } else {
      setUser(null);
      setRole(null);
    }
  }, []);

  const login = (token, userData, userRole) => {
    if (userRole === "admin") {
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(userData));
    } else if (userRole === "student") {
      localStorage.setItem("studentToken", token);
      localStorage.setItem("studentUser", JSON.stringify(userData));
    } else if (userRole === "teacher") {
      localStorage.setItem("teacherToken", token);
      localStorage.setItem("teacherUser", JSON.stringify(userData));
    }
      localStorage.setItem("role", userRole);

    setUser(userData);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("studentToken");
    localStorage.removeItem("studentUser");
    localStorage.removeItem("teacherToken");
    localStorage.removeItem("teacherUser");
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
