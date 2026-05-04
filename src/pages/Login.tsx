import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerContext, type CustomerRole } from "../context/CustomerContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useCustomerContext();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<CustomerRole>("Staff");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      setError("Please enter your name.");
      return;
    }

    login(trimmedUsername, role);
    navigate("/");
  };

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="home-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Login</h1>
        <p className="welcome-description">
          Sign in to manage customer data and access your dashboard.
        </p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12, textAlign: "left" }}>
            <label htmlFor="username" style={{ display: "block", marginBottom: 6 }}>
              Name
            </label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
              placeholder="Enter your name"
            />
          </div>
          <div style={{ marginBottom: 18, textAlign: "left" }}>
            <label htmlFor="role" style={{ display: "block", marginBottom: 6 }}>
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(event) => setRole(event.target.value as CustomerRole)}
              style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ccc" }}
            >
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button primary-button" style={{ width: "100%" }}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
