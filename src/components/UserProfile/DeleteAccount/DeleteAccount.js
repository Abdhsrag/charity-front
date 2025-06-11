// src/components/UserProfile/DeleteAccount/DeleteAccount.js
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./DeleteAccount.css";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const history = useHistory();

  const handleConfirmDelete = async () => {
    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const token = localStorage.getItem("accessToken");
      const user_id = localStorage.getItem("user_id");

      await axios.delete(
        `http://127.0.0.1:8000/api/user/deactivate/${user_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Account deleted successfully.");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user_id");

      setTimeout(() => {
        history.push("/register"); // or "/login"
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(true);
      setMessage("Failed to delete account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Delete Account</h2>

      {message && (
        <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      {!showConfirm && (
        <>
          <p className="delete-text">
            Deleting your account is permanent and cannot be undone.
          </p>

          <button
            onClick={() => setShowConfirm(true)}
            className="form-button delete-button"
          >
            Delete My Account
          </button>
        </>
      )}

      {showConfirm && (
        <div className="confirm-box">
          <p>Are you sure you want to delete your account?</p>
          <div className="confirm-buttons">
            <button
              onClick={handleConfirmDelete}
              className="form-button delete-button"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, Delete"}
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className="form-button cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
