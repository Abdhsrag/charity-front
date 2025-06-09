// src/components/hooks/auth/useLogin.js
import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/user/login/";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const login = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMessage("");

    try {
      const response = await axios.post(API_URL, {
        email: formData.email,
        password: formData.password,
      });

      // Save tokens
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      setSuccess(true);
      setMessage("Login successful!");
    } catch (err) {
      setError(err.response?.data || err.message);
      setMessage(err.response?.data?.detail || "Login failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error, success, message };
};
