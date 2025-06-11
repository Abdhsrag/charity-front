// src/components/hooks/auth/useRegister.js
import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/user/register/";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const register = useCallback(async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    setMessage("");

    try {
      const response = await axios.post(API_URL, {
        fname: formData.fname,
        lname: formData.lname,
        email: formData.email,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        mphone: formData.mphone,
        country: formData.country,
        bdate: formData.bdate,
        type: formData.type,
      });

      setSuccess(true);
      setMessage(
        response.data.detail ||
          "Registration successful! Please check your email."
      );
    } catch (err) {
      setError(err.response?.data || err.message);
      setMessage(
        err.response?.data?.detail ||
          err.response?.data?.error ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return { register, loading, error, success, message };
};
