// src/components/hooks/auth/useActivateAccount.js
import { useState, useCallback } from "react";
import axios from "axios";

export const useActivateAccount = (uid, token) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("Activating your account...");

  const activateAccount = useCallback(async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/user/activate/${uid}/${token}/`
      );

      setSuccess(true);
      setMessage(response.data.detail || "Account activated successfully.");
    } catch (err) {
      setError(err.response?.data || err.message);
      setMessage(
        err.response?.data?.detail || "Activation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, [uid, token]);

  return { activateAccount, loading, error, success, message };
};
