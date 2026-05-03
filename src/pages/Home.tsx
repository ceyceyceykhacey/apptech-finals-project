import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <div className="welcome-card">
        <h1 className="welcome-title">Welcome to</h1>
        <h2 className="system-title">Customer Information Management System</h2>
        <p className="welcome-description">
          Manage your customer data efficiently with our comprehensive system.
          Add, edit, and organize customer information including addresses and contacts.
        </p>
        <div className="action-buttons">
          <Link to="/customers" className="button primary-button">View Customers</Link>
          <Link to="/dashboard" className="button secondary-button">Admin Dashboard</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;