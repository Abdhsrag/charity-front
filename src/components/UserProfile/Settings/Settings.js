// src/components/UserProfile/Settings/Settings.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Settings.css";

const Settings = () => {
  const user_id = localStorage.getItem("user_id");
  const accessToken = localStorage.getItem("accessToken");

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    mphone: "",
    country: "",
    bdate: "",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user_id || !accessToken) {
        setError("You must be logged in to view your settings.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/user/${user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        // Map response → set initial form data
        setFormData({
          fname: response.data.fname || "",
          lname: response.data.lname || "",
          mphone: response.data.mphone || "",
          country: response.data.country || "",
          bdate: response.data.bdate || "",
        });
      } catch (err) {
        console.error(err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user_id, accessToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const dataToSend = {
        fname: formData.fname,
        lname: formData.lname,
        mphone: formData.mphone,
        country: formData.country,
        bdate: formData.bdate,
      };

      await axios.patch(
        `http://127.0.0.1:8000/api/user/${user_id}/`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">User Settings</h2>

      {loading && <p>Loading profile...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {!loading && !error && (
        <form onSubmit={handleSubmit} className="settings-form">
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            className="form-control"
            value={formData.fname}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            className="form-control"
            value={formData.lname}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="mphone"
            placeholder="Mobile Phone"
            className="form-control"
            value={formData.mphone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            className="form-control"
            value={formData.country}
            onChange={handleChange}
          />

          <input
            type="date"
            name="bdate"
            className="form-control"
            value={formData.bdate}
            onChange={handleChange}
          />

          <button type="submit" className="form-button" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Settings;
