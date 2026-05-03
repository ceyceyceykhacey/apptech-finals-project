import { useCustomerContext } from "../context/CustomerContext";

const Dashboard = () => {
  const { role, setRole } = useCustomerContext();

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div className="card">
        <h3>User Role & Access Management</h3>
        <p>Current role: <strong>{role}</strong></p>
        <button className="button" onClick={() => setRole("Admin")} disabled={role === "Admin"}>
          Admin
        </button>
        <button className="button" onClick={() => setRole("Staff")} disabled={role === "Staff"}>
          Staff
        </button>
      </div>
    </div>
  );
};

export default Dashboard;