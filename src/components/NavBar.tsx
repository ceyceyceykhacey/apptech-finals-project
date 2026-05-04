import { Link, useNavigate } from "react-router-dom";
import { useCustomerContext } from "../context/CustomerContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { role, isAuthenticated, logout } = useCustomerContext();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
      <div>
        <Link to="/">Home</Link> | <Link to="/customers">Customers</Link> | <Link to="/dashboard">Dashboard</Link>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontWeight: 500 }}>Role: {isAuthenticated ? role : "Guest"}</span>
        {isAuthenticated ? (
          <button className="button secondary-button" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" className="button primary-button">Login</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;