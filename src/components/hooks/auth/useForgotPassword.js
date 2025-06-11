// src/components/hooks/auth/useForgotPassword.js
import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/user/request-reset-password/";

export const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const forgotPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMessage("");

    try {
      const response = await axios.post(API_URL, { email });
      setSuccess(true);
      setMessage(
        response.data.detail ||
          "Password reset email sent. Please check your inbox."
      );
    } catch (err) {
      setError(err.response?.data || err.message);
      setMessage(
        err.response?.data?.detail || "Failed to send password reset email."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { forgotPassword, loading, error, success, message };
};
