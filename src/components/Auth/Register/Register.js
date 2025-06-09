import React, { useState } from "react";
import { useRegister } from "../../hooks/auth/useRegister";
import "./Register.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mphone: "",
    country: "",
    bdate: "",
    type: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, loading, error, success, message } = useRegister();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirm = () => setShowConfirm(!showConfirm);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    register(formData);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>

      {message && (
        <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form">
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
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="input-group">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="form-control"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={toggleShowConfirm}
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

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

        <select
          name="type"
          className="form-control"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Type --</option>
          <option value="admin">Admin</option>
          <option value="owner">Owner</option>
          <option value="donor">Donor</option>
        </select>

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="already-account">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;
