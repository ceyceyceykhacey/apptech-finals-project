import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCustomerContext } from "../context/CustomerContext";
import "../styles/dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { customers } = useCustomerContext();

  // Redirect if not admin
  if (user?.role !== "Admin") {
    return (
      <div className="dashboard-container">
        <div className="access-denied">
          <h2>Access Denied</h2>
          <p>Only administrators can access this dashboard.</p>
          <button onClick={() => navigate("/")} className="btn-primary">
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const totalCustomers = customers.length;
  const customersWithEmails = customers.filter((c) => c.email).length;
  const customersWithAddresses = customers.filter((c) => c.addresses.length > 0).length;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>👨‍💼 Admin Dashboard</h1>
        <p className="dashboard-subtitle">System Management & Statistics</p>
      </div>

      <div className="dashboard-grid">
        {/* Statistics Cards */}
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-label">Total Customers</div>
            <div className="stat-value">{totalCustomers}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📧</div>
          <div className="stat-content">
            <div className="stat-label">Customers with Email</div>
            <div className="stat-value">{customersWithEmails}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏠</div>
          <div className="stat-content">
            <div className="stat-label">Customers with Address</div>
            <div className="stat-value">{customersWithAddresses}</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <div className="stat-label">Completion Rate</div>
            <div className="stat-value">
              {totalCustomers > 0
                ? Math.round(((customersWithEmails + customersWithAddresses) / (totalCustomers * 2)) * 100)
                : 0}
              %
            </div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="dashboard-section">
        <h2>System Information</h2>
        <div className="info-grid">
          <div className="info-card">
            <label className="info-label">Current User:</label>
            <span className="info-value">{user?.username}</span>
          </div>
          <div className="info-card">
            <label className="info-label">Email:</label>
            <span className="info-value">{user?.email}</span>
          </div>
          <div className="info-card">
            <label className="info-label">Role:</label>
            <span className="info-value role-badge">{user?.role}</span>
          </div>
          <div className="info-card">
            <label className="info-label">Last Login:</label>
            <span className="info-value">Just now</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <button onClick={() => navigate("/customers")} className="action-btn">
            <span className="action-icon">👥</span>
            <span>Manage Customers</span>
          </button>
          <button onClick={() => navigate("/")} className="action-btn">
            <span className="action-icon">🏠</span>
            <span>Go to Home</span>
          </button>
        </div>
      </div>

      {/* Admin Notes */}
      <div className="dashboard-section">
        <h2>Admin Notes</h2>
        <div className="notes-box">
          <p>Welcome to the admin dashboard. From here you can:</p>
          <ul className="notes-list">
            <li>View system statistics and customer information</li>
            <li>Manage customer records</li>
            <li>Monitor data completion rates</li>
            <li>Perform administrative tasks</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;