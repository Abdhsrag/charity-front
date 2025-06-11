// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import { useResetPassword } from "../../hooks/auth/useResetPassword";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import "./ResetPassword.css";

// const ResetPassword = () => {
//   const { uid, token } = useParams();
//   const history = useHistory();

//   const [formData, setFormData] = useState({
//     new_password: "",
//     confirm_password: "",
//   });

//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const { resetPassword, loading, error, success, message } = useResetPassword(
//     uid,
//     token
//   );

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.new_password !== formData.confirm_password) {
//       alert("Passwords do not match!");
//       return;
//     }

//     resetPassword(formData);
//   };

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         history.push("/login");
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [success, history]);

//   return (
//     <div className="form-container">
//       <h2 className="form-title">Reset Password</h2>

//       {message && (
//         <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
//           {message}
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="reset-form">
//         <div className="input-group">
//           <input
//             type={showNewPassword ? "text" : "password"}
//             name="new_password"
//             placeholder="New Password"
//             className="form-control"
//             value={formData.new_password}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="button"
//             className="toggle-password"
//             onClick={() => setShowNewPassword(!showNewPassword)}
//           >
//             {showNewPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         <div className="input-group">
//           <input
//             type={showConfirmPassword ? "text" : "password"}
//             name="confirm_password"
//             placeholder="Confirm New Password"
//             className="form-control"
//             value={formData.confirm_password}
//             onChange={handleChange}
//             required
//           />
//           <button
//             type="button"
//             className="toggle-password"
//             onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//           >
//             {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         <button type="submit" className="form-button" disabled={loading}>
//           {loading ? "Resetting Password..." : "Reset Password"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPassword } from "../../hooks/auth/useResetPassword";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { resetPassword, loading, error, success, message } = useResetPassword(
    uid,
    token
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.new_password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return;
    }

    resetPassword(formData);
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="form-container">
      <h2 className="form-title">Reset Password</h2>

      {message && (
        <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="reset-form">
        <div className="input-group">
          <input
            type={showNewPassword ? "text" : "password"}
            name="new_password"
            placeholder="New Password"
            className="form-control"
            value={formData.new_password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="input-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm_password"
            placeholder="Confirm New Password"
            className="form-control"
            value={formData.confirm_password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Resetting Password..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
