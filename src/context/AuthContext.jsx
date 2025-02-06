import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setrole] = useState(null);

  const login = async (token) => {
    localStorage.setItem("auth_token", token);
    setIsAuthenticated(true);


    if(isAuthenticated) {
    // جلب بيانات المستخدم
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); // تخزين بيانات المستخدم
      console.log(response.data);

      setrole(response.data.role);
      console.log(response.data.role);
      localStorage.setItem("user", JSON.stringify(response.data));

    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }};

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      login(token); // التحقق من المستخدم عند تحميل التطبيق
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout,role }}>
      {children}
    </AuthContext.Provider>
  );
};
