import { Link } from "react-router-dom";
import { useCustomerContext } from "../context/CustomerContext";

const Home = () => {
  const { isAuthenticated } = useCustomerContext();

  return (
    <div className="home-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to</h1>
        <h2 className="system-title">Customer Information Management System</h2>
        <p className="welcome-description">
          Manage your customer data efficiently with our comprehensive system.
          Add, edit, and organize customer information including addresses and contacts.
        </p>
        <div className="action-buttons" style={{ flexDirection: "column", gap: 12 }}>
          {!isAuthenticated && (
            <Link to="/login" className="button primary-button">Log In</Link>
          )}
          <div>
            <Link to="/customers" className="button primary-button">View Customers</Link>
            <Link to="/dashboard" className="button secondary-button">Admin Dashboard</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;