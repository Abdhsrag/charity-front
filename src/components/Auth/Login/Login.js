import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { login, loading, error, success, message } = useLogin();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/forgot-password"); // or "/home"
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, history]);

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      {message && (
        <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="login-form">
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

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="forgot-password-link">
        <span onClick={() => history.push("/forgot-password")} className="link">
          Forgot your password?
        </span>
      </p>

      <p className="no-account">
        Don't have an account?{" "}
        <span onClick={() => history.push("/register")} className="link">
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
