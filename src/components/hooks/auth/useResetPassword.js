// src/components/hooks/auth/useResetPassword.js
import { useState, useCallback } from "react";
import axios from "axios";

export const useResetPassword = (uid, token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const resetPassword = useCallback(
    async (formData) => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      setMessage("");

      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/user/reset-password/${uid}/${token}/`,
          {
            new_password: formData.new_password,
            confirm_password: formData.confirm_password,
          }
        );

        setSuccess(true);
        setMessage(response.data.detail || "Password reset successful.");
      } catch (err) {
        setError(err.response?.data || err.message);
        setMessage(
          err.response?.data?.detail ||
            "Password reset failed. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [uid, token]
  );

  return { resetPassword, loading, error, success, message };
};
