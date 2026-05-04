import { createContext, useContext, useState, type ReactNode } from "react";
import type { Customer } from "../types/Customer";

export type CustomerRole = "Admin" | "Staff";

interface CustomerContextValue {
  customers: Customer[];
  role: CustomerRole;
  username: string | null;
  isAuthenticated: boolean;
  setRole: (role: CustomerRole) => void;
  login: (username: string, role: CustomerRole) => void;
  logout: () => void;
  addCustomer: (name: string) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: number) => void;
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined);

const defaultRole: CustomerRole = "Admin";

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [role, setRole] = useState<CustomerRole>(defaultRole);
  const [username, setUsername] = useState<string | null>(null);

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

  const deleteCustomer = (id: number) => {
    setCustomers((previous) => previous.filter((item) => item.id !== id));
  };

  const login = (name: string, newRole: CustomerRole) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setUsername(trimmed);
    setRole(newRole);
  };

  const logout = () => {
    setUsername(null);
    setRole(defaultRole);
  };

  const isAuthenticated = username !== null;

  return (
    <CustomerContext.Provider value={{ customers, role, username, isAuthenticated, setRole, login, logout, addCustomer, updateCustomer, deleteCustomer }}>
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
