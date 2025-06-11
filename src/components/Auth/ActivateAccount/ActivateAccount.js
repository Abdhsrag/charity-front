// import React, { useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
// import { useActivateAccount } from "../../hooks/auth/useActivateAccount";
// import "./ActivateAccount.css";

// const ActivateAccount = () => {
//   const { uid, token } = useParams();
//   const history = useHistory();

//   const { activateAccount, loading, error, success, message } =
//     useActivateAccount(uid, token);

//   useEffect(() => {
//     activateAccount();
//   }, [activateAccount]);

//   useEffect(() => {
//     if (success) {
//       const timer = setTimeout(() => {
//         history.push("/login");
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, [success, history]);

//   return (
//     <div className="form-container">
//       <h2 className="form-title">Account Activation</h2>

//       {loading && (
//         <div className="alert alert-info">Activating your account...</div>
//       )}

//       {!loading && (
//         <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
//           {message}
//         </div>
//       )}

//       {!error && success && (
//         <p className="redirect-info">
//           You will be redirected to login shortly...
//         </p>
//       )}
//     </div>
//   );
// };

// export default ActivateAccount;
import React, { useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import { useActivateAccount } from "../../hooks/auth/useActivateAccount";

import "./ActivateAccount.css";

const ActivateAccount = () => {
  const { uid, token } = useParams();

  const navigate = useNavigate();

  const { activateAccount, loading, error, success, message } =
    useActivateAccount(uid, token);

  useEffect(() => {
    activateAccount();
  }, [activateAccount]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="form-container">
      <h2 className="form-title">Account Activation</h2>

      {loading && (
        <div className="alert alert-info">Activating your account...</div>
      )}

      {!loading && (
        <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      {!error && success && (
        <p className="redirect-info">
          You will be redirected to login shortly...
        </p>
      )}
    </div>
  );
};

export default ActivateAccount;
