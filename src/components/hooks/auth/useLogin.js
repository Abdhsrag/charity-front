// src/components/hooks/auth/useLogin.js

import { useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/user/login/";
const RESEND_ACTIVATION_URL =
  "http://127.0.0.1:8000/api/user/resend-activation/";

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

      // Decode token to get user_id
      const decoded = jwtDecode(response.data.access);
      localStorage.setItem("user_id", decoded.user_id);
      localStorage.setItem("email", decoded.email || "");
      localStorage.setItem("role", decoded.role || "");
      localStorage.setItem("first_name", decoded.fname || "");
      localStorage.setItem("last_name", decoded.lname || "");
      setSuccess(true);
      setMessage("Login successful!");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data || err.message);

      const detail = err.response?.data?.detail;
      console.log("Login error detail:", detail);

      setMessage(detail || "Login failed.");

      // AUTOMATIC resend if needed:
      const detailMessage = Array.isArray(detail) ? detail[0] : detail;

      if (
        detailMessage &&
        typeof detailMessage === "string" &&
        detailMessage.toLowerCase().includes("activate")
      ) {
        try {
          await axios.post(
            RESEND_ACTIVATION_URL,
            { email: formData.email },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Activation email resent automatically.");
        } catch (resendErr) {
          console.error("Failed to resend activation email:", resendErr);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading, error, success, message };
};
