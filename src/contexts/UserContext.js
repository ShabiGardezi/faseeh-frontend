"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      // const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
      // if (storedUser && storedToken) {
      //   setUser(JSON.parse(storedUser));
      //   setToken(storedToken);
      //   setIsAuthenticated(isLoggedIn);
      // }

      if (storedUser && storedToken) {
        // Set token temporarily to axios headers for verification
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${storedToken}`;

        try {
          // Verify the token
          const response = await axiosInstance.post("/auth/verify-token", {
            token: storedToken,
          });

          if (response?.data?.user) {
            const userData = response.data.user;
            const token = response.data.token;

            setUser(userData);
            setToken(token);
            setIsAuthenticated(true);

            // Update localStorage with verified data
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", token);
            localStorage.setItem("isAuthenticated", "true");
          } else {
            handleInvalidToken();
          }
        } catch (error) {
          handleInvalidToken();
        }
      }
    };

    loadUserData();
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
