import { createContext, useContext, useState, type ReactNode } from "react";
import type { Customer } from "../types/Customer";

export type CustomerRole = "Admin" | "Staff";

interface CustomerContextValue {
  customers: Customer[];
  role: CustomerRole;
  setRole: (role: CustomerRole) => void;
  addCustomer: (name: string) => void;
  updateCustomer: (customer: Customer) => void;
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined);

const defaultRole: CustomerRole = "Admin";

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [role, setRole] = useState<CustomerRole>(defaultRole);

  const addCustomer = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setCustomers((previous) => [
      ...previous,
      {
        id: Date.now(),
        name: trimmed,
        addresses: [],
        contacts: [],
      },
    ]);
  };

  const updateCustomer = (customer: Customer) => {
    setCustomers((previous) =>
      previous.map((item) => (item.id === customer.id ? customer : item))
    );
  };

  return (
    <CustomerContext.Provider value={{ customers, role, setRole, addCustomer, updateCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomerContext must be used within CustomerProvider");
  }
  return context;
};
