import { Link } from "react-router-dom";
import { useCustomerContext } from "../context/CustomerContext";

const NavBar = () => {
  const { role } = useCustomerContext();

  return (
    <div className="card">
      <Link to="/">Customers</Link> | <Link to="/dashboard">Dashboard</Link>
      <span style={{ marginLeft: 16, fontWeight: 500 }}>Role: {role}</span>
    </div>
  );
};

export default NavBar;