'use client'
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user data and verify token on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");


    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuthenticated(isLoggedIn);
    }

    // if (storedUser && storedToken) {
    //   // Set temporary token to axios headers for verification
    //   axiosInstance.defaults.headers.common[
    //     "Authorization"
    //   ] = `Bearer ${storedToken}`;

    //   // Verify the token
    //   axiosInstance
    //     .get("/auth/verify-token") // Adjust this endpoint to your token verification API route
    //     .then((response) => {
    //       if (response.data.isValid) {
    //         setUser(JSON.parse(storedUser));
    //         setToken(storedToken);
    //         setIsAuthenticated(true);
    //       } else {
    //         handleInvalidToken();
    //       }
    //     })
    //     .catch(() => {
    //       handleInvalidToken();
    //     });
    // }
  }, []);

  const handleInvalidToken = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    // Clear from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
  };

  const saveUserData = (userData, token) => {
    setUser(userData);
    setToken(token);
    setIsAuthenticated(true);

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    localStorage.setItem("isAuthenticated", "true");

    // Set token to axios headers
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const removeUserData = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    // Remove from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");

    // Remove token from axios headers
    delete axiosInstance.defaults.headers.common["Authorization"];
  };

  return (
    <UserContext.Provider
      value={{ user, token, isAuthenticated, saveUserData, removeUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
