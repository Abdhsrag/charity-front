import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const useAuth = () => {
  const [auth, setAuth] = useState({
    token: null,
    user_id: null,
    email: null,
    role: null,
  });

  const loadAuthData = () => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setAuth({
          token,
          user_id: decoded.user_id,
          email: decoded.email,
          role: decoded.role || null,
        });
      } catch (err) {
        console.error("Invalid token:", err);
        setAuth({
          token: null,
          user_id: null,
          email: null,
          role: null,
        });
      }
    } else {
      setAuth({
        token: null,
        user_id: null,
        email: null,
        role: null,
      });
    }
  };

  useEffect(() => {
    loadAuthData();

    const handleStorageChange = () => {
      loadAuthData();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return auth;
};
