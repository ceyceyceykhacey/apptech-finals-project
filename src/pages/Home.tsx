import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome Back, {user?.username}! 👋</h1>
          <p className="welcome-subtitle">
            Your trusted customer information management system
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-section">
        <div className="stat-box">
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <div className="stat-label">Your Role</div>
            <div className="stat-value">{user?.role}</div>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">📧</div>
          <div className="stat-info">
            <div className="stat-label">Email</div>
            <div className="stat-value" title={user?.email}>{user?.email}</div>
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-icon">🕐</div>
          <div className="stat-info">
            <div className="stat-label">Account Status</div>
            <div className="stat-value">Active</div>
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="actions-section">
        <h2 className="section-title">What would you like to do?</h2>

        <div className="actions-grid">
          {(user?.role === "Admin" || user?.role === "Staff") && (
            <button
              onClick={() => navigate("/customers")}
              className="action-card"
            >
              <span className="action-emoji">👥</span>
              <span className="action-title">Manage Customers</span>
              <span className="action-description">View, add, and manage customer information</span>
            </button>
          )}

          {user?.role === "Admin" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="action-card admin-card"
            >
              <span className="action-emoji">⚙️</span>
              <span className="action-title">Admin Dashboard</span>
              <span className="action-description">View system statistics and settings</span>
            </button>
          )}

          {user?.role === "Customer" && (
            <div className="action-card customer-info">
              <span className="action-emoji">ℹ️</span>
              <span className="action-title">Customer Portal</span>
              <span className="action-description">View your information and account details</span>
            </div>
          )}
        </div>
      </div>

      {/* Help Section */}
      <div className="help-section">
        <h2 className="section-title">Need Help?</h2>
        <div className="help-cards">
          <div className="help-card">
            <h3>Getting Started</h3>
            <ul>
              <li>Navigate using the menu at the top</li>
              <li>Use the search function to find customers</li>
              <li>Click on any customer to view details</li>
            </ul>
          </div>
          <div className="help-card">
            <h3>Features</h3>
            <ul>
              <li>Add new customer records</li>
              <li>Manage addresses and contacts</li>
              <li>Search and filter customers</li>
              <li>View system statistics (Admin only)</li>
            </ul>
          </div>
          <div className="help-card">
            <h3>Tips</h3>
            <ul>
              <li>Use large text for better readability</li>
              <li>All buttons are clearly labeled</li>
              <li>Take your time - there's no rush!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="home-footer">
        <p>Customer Information Management System © 2026</p>
        <p>Senior-Friendly • Easy to Use • Secure</p>
      </div>
    </div>
  );
};

export default Home;