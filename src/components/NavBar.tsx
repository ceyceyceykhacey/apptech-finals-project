import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const NavBar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!isAuthenticated) {
    return (
      <nav className="navbar navbar-unauthenticated">
        <div className="navbar-container">
          <div className="navbar-logo">
            <Link to="/">📋 Customer Manager</Link>
          </div>
          <div className="navbar-links">
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">📋 Customer Manager</Link>
        </div>

        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          {(user?.role === "Admin" || user?.role === "Staff") && (
            <Link to="/customers" className="nav-link">
              Customers
            </Link>
          )}
          {user?.role === "Admin" && (
            <Link to="/dashboard" className="nav-link">
              Admin Dashboard
            </Link>
          )}
        </div>

        <div className="navbar-user-info">
          <span className="user-role-badge" data-role={user?.role}>
            {user?.role}
          </span>
          <span className="user-name">{user?.username}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;