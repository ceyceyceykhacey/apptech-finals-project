import { Link, useParams } from "react-router-dom";
import type { Address } from "../types/Address";
import type { Contact } from "../types/Contact";
import AddressList from "../components/AddressList";
import ContactList from "../components/ContactList";
import { useCustomerContext } from "../context/CustomerContext";

const CustomerDetails = () => {
  const { id } = useParams();
  const { customers, updateCustomer, role } = useCustomerContext();
  const customerId = Number(id);
  const customer = customers.find((item) => item.id === customerId);

  if (!customer) {
    return (
      <div>
        <h2>Customer not found</h2>
        <Link to="/">Back to Customers</Link>
      </div>
    );
  }

  const updateAddresses = (addresses: Address[]) => {
    updateCustomer({ ...customer, addresses });
  };

  const updateContacts = (contacts: Contact[]) => {
    updateCustomer({ ...customer, contacts });
  };

  return (
    <div>
      <h2>{customer.name}</h2>
      <div className="card">
        <Link to="/">Back to Customers</Link>
      </div>

      <AddressList addresses={customer.addresses} setAddresses={updateAddresses} canDelete={role === "Admin"} />
      <ContactList contacts={customer.contacts} setContacts={updateContacts} canDelete={role === "Admin"} />
    </div>
  );
};

export default CustomerDetails;