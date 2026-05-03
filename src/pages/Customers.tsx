import { useState } from "react";
import { Link } from "react-router-dom";
import { useCustomerContext } from "../context/CustomerContext";

const Customers = () => {
  const { customers, addCustomer, deleteCustomer, role } = useCustomerContext();
  const [name, setName] = useState("");

  const addNewCustomer = () => {
    if (!name.trim()) return;
    addCustomer(name.trim());
    setName("");
  };

  return (
    <div>
      <h2>Customers</h2>

      <div className="card">
        <input
          placeholder="Customer name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="button" onClick={addNewCustomer}>
          Add Customer
        </button>
      </div>

      {customers.length === 0 ? (
        <div className="card">No customers yet. Add one to begin.</div>
      ) : (
        customers.map((customer) => (
          <div key={customer.id} className="card customer-row">
            <Link to={`/customer/${customer.id}`}>{customer.name}</Link>
            {role === "Admin" && (
              <button
                className="button delete-button"
                onClick={() => deleteCustomer(customer.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Customers;