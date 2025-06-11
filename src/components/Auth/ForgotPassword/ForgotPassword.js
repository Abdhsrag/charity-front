// import React, { useState } from "react";
// import { useForgotPassword } from "../../hooks/auth/useForgotPassword";
// import "./ForgotPassword.css";
// import { useHistory } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const { forgotPassword, loading, error, success, message } =
//     useForgotPassword();
//   const history = useHistory();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     forgotPassword(email);
//   };

//   return (
//     <div className="form-container">
//       <h2 className="form-title">Forgot Password</h2>

//       {message && (
//         <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="forgot-form">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           className="form-input"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <button type="submit" className="form-button" disabled={loading}>
//           {loading ? "Sending..." : "Send Reset Link"}
//         </button>
//       </form>

//       <p className="already-account">
//         Remembered your password?{" "}
//         <span onClick={() => history.push("/login")} className="link">
//           Sign in
//         </span>
//       </p>
//     </div>
//   );
// };

// export default ForgotPassword;
import React, { useState } from "react";
import { useForgotPassword } from "../../hooks/auth/useForgotPassword";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { forgotPassword, loading, error, success, message } = useForgotPassword();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Forgot Password</h2>

      {message && (
        <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="forgot-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <p className="already-account">
        Remembered your password?{" "}
        <span onClick={() => navigate("/login")} className="link">
          Sign in
        </span>
      </p>
    </div>
  );
};

export default ForgotPassword;
