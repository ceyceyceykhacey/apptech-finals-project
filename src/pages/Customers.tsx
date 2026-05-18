import { useState } from "react";
import { Link } from "react-router-dom";
import { useCustomerContext } from "../context/CustomerContext";
import { useAuth } from "../context/AuthContext";
import type { Customer } from "../types/Customer";
import "../styles/customers.css";

const Customers = () => {
  const { customers, addCustomer, deleteCustomer, searchCustomers, filterCustomers } =
    useCustomerContext();
  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    addressType: "",
    addressValue: "",
    contactType: "",
    contactValue: "",
    notes: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterAddress, setFilterAddress] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please enter at least name and email");
      return;
    }

    const newCustomer: Omit<Customer, "id" | "createdAt"> = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      addresses: formData.addressValue
        ? [
            {
              id: Date.now(),
              type: formData.addressType || "Home",
              value: formData.addressValue,
              isDefault: true,
              isVerified: false,
            },
          ]
        : [],
      contacts: formData.contactValue
        ? [
            {
              id: Date.now(),
              type: formData.contactType || "Phone",
              value: formData.contactValue,
              isPrimary: true,
              isVerified: false,
            },
          ]
        : [],
      notes: formData.notes,
    };

    addCustomer(newCustomer);
    setFormData({
      name: "",
      email: "",
      addressType: "",
      addressValue: "",
      contactType: "",
      contactValue: "",
      notes: "",
    });
    setShowForm(false);
    alert("Customer added successfully!");
  };

  // Get filtered and searched customers
  let displayedCustomers: Customer[] = customers;
  if (searchQuery) {
    displayedCustomers = searchCustomers(searchQuery);
  } else if (filterEmail || filterAddress) {
    displayedCustomers = filterCustomers({
      email: filterEmail,
      address: filterAddress,
    });
  }

  const isAdmin = user?.role === "Admin";

  return (
    <div className="customers-container">
      <div className="customers-header">
        <h1>👥 Customer Management</h1>
        <p>Manage and view all customer information</p>
      </div>

      {/* Add Customer Button */}
      {isAdmin && (
        <button onClick={() => setShowForm(!showForm)} className="btn-add-customer">
          {showForm ? "Cancel" : "+ Add New Customer"}
        </button>
      )}

      {/* Add Customer Form */}
      {showForm && isAdmin && (
        <div className="form-container">
          <h2>Create New Customer</h2>
          <form onSubmit={handleAddCustomer} className="customer-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter customer name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="form-input"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Address Type</label>
                <input
                  type="text"
                  name="addressType"
                  value={formData.addressType}
                  onChange={handleInputChange}
                  placeholder="e.g., Home, Work"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="addressValue"
                  value={formData.addressValue}
                  onChange={handleInputChange}
                  placeholder="Enter street address"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Contact Type</label>
                <input
                  type="text"
                  name="contactType"
                  value={formData.contactType}
                  onChange={handleInputChange}
                  placeholder="e.g., Phone, Mobile"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Value</label>
                <input
                  type="text"
                  name="contactValue"
                  value={formData.contactValue}
                  onChange={handleInputChange}
                  placeholder="Enter phone or contact number"
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any additional notes"
                className="form-input form-textarea"
                rows={3}
              />
            </div>

            <button type="submit" className="btn-submit">
              Create Customer
            </button>
          </form>
        </div>
      )}

      {/* Search and Filter */}
      <div className="search-filter-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search by name or email..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setFilterEmail("");
              setFilterAddress("");
            }}
            className="search-input"
          />
        </div>

        <div className="filter-boxes">
          <input
            type="text"
            placeholder="Filter by email..."
            value={filterEmail}
            onChange={(e) => {
              setFilterEmail(e.target.value);
              setSearchQuery("");
            }}
            className="filter-input"
          />
          <input
            type="text"
            placeholder="Filter by address..."
            value={filterAddress}
            onChange={(e) => {
              setFilterAddress(e.target.value);
              setSearchQuery("");
            }}
            className="filter-input"
          />
          {(searchQuery || filterEmail || filterAddress) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setFilterEmail("");
                setFilterAddress("");
              }}
              className="btn-clear-filters"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Customers List */}
      <div className="customers-list">
        {displayedCustomers.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h3>No Customers Found</h3>
            <p>
              {customers.length === 0
                ? "Add your first customer to get started."
                : "No customers match your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className="customers-grid">
            {displayedCustomers.map((customer) => (
              <div key={customer.id} className="customer-card">
                <div className="customer-header">
                  <h3>
                    <Link to={`/customer/${customer.id}`} className="customer-link">
                      {customer.name}
                    </Link>
                  </h3>
                  {isAdmin && (
                    <button
                      onClick={() => deleteCustomer(customer.id)}
                      className="btn-delete"
                      title="Delete customer"
                    >
                      🗑️
                    </button>
                  )}
                </div>
                <div className="customer-details">
                  <p>
                    <strong>Email:</strong> {customer.email}
                  </p>
                  {customer.addresses.length > 0 && (
                    <p>
                      <strong>Address:</strong> {customer.addresses[0].value}
                    </p>
                  )}
                  {customer.contacts.length > 0 && (
                    <p>
                      <strong>Contact:</strong> {customer.contacts[0].value}
                    </p>
                  )}
                  {customer.notes && (
                    <p className="customer-notes">
                      <strong>Notes:</strong> {customer.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="customers-footer">
        <p>Total customers: {customers.length} | Displaying: {displayedCustomers.length}</p>
      </div>
    </div>
  );
};

export default Customers;