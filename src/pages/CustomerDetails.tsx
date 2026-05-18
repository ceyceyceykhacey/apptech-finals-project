import { useNavigate, useParams } from "react-router-dom";
import type { Address } from "../types/Address";
import type { Contact } from "../types/Contact";
import AddressList from "../components/AddressList";
import ContactList from "../components/ContactList";
import { useCustomerContext } from "../context/CustomerContext";
import { useAuth } from "../context/AuthContext";
import "../styles/customer-details.css";

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { customers, updateCustomer } = useCustomerContext();
  const customerId = Number(id);
  const customer = customers.find((item) => item.id === customerId);

  const isAdmin = user?.role === "Admin";

  if (!customer) {
    return (
      <div className="customer-details-container">
        <div className="not-found">
          <h2>Customer Not Found</h2>
          <p>The customer you're looking for doesn't exist or has been deleted.</p>
          <button onClick={() => navigate("/customers")} className="btn-back">
            Go Back to Customers
          </button>
        </div>
      </div>
    );
  }

  const updateAddresses = (addresses: Address[]) => {
    updateCustomer({ ...customer, addresses });
  };

  const updateContacts = (contacts: Contact[]) => {
    updateCustomer({ ...customer, contacts });
  };

  const updateInfo = (field: string, value: string) => {
    const updatedCustomer = { ...customer, [field]: value };
    updateCustomer(updatedCustomer);
  };

  return (
    <div className="customer-details-container">
      <div className="details-header">
        <h1>👤 {customer.name}</h1>
        <button onClick={() => navigate("/customers")} className="btn-back">
          ← Back to Customers
        </button>
      </div>

      {/* Customer Info Section */}
      <div className="details-card">
        <h2>Customer Information</h2>
        <div className="info-grid">
          <div className="info-row">
            <label className="info-label">Email:</label>
            <span className="info-value">{customer.email}</span>
          </div>
          {customer.notes && (
            <div className="info-row">
              <label className="info-label">Notes:</label>
              <span className="info-value">{customer.notes}</span>
            </div>
          )}
          <div className="info-row">
            <label className="info-label">Created:</label>
            <span className="info-value">
              {new Date(customer.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Addresses Section */}
      <div className="details-card">
        <AddressList
          addresses={customer.addresses}
          setAddresses={updateAddresses}
          canDelete={isAdmin}
        />
      </div>

      {/* Contacts Section */}
      <div className="details-card">
        <ContactList
          contacts={customer.contacts}
          setContacts={updateContacts}
          canDelete={isAdmin}
        />
      </div>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="details-card admin-actions">
          <h2>Admin Actions</h2>
          <p className="admin-note">As an administrator, you have full access to this customer's information.</p>
          <div className="actions-buttons">
            <button
              onClick={() => {
                updateInfo("name", customer.name + " (Updated)");
              }}
              className="btn-action"
            >
              Mark Updated
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;