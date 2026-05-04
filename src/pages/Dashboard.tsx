import { useCustomerContext } from "../context/CustomerContext";

const Dashboard = () => {
  const { username, role } = useCustomerContext();

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {username && (
        <p style={{ fontWeight: 600 }}>Signed in as {username}</p>
      )}

      <div className="card">
        <h3>User Information</h3>
        <p>Current role: <strong>{role}</strong></p>
      </div>
    </div>
  );
};

export default Dashboard;