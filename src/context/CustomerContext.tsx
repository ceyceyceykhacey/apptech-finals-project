import { createContext, useContext, useState, type ReactNode } from "react";
import type { Customer } from "../types/Customer";

export type CustomerRole = "Admin" | "Staff";

interface User {
  id: number;
  username: string;
  role: CustomerRole;
}

interface CustomerContextValue {
  customers: Customer[];
  role: CustomerRole;
  username: string | null;
  isAuthenticated: boolean;
  setRole: (role: CustomerRole) => void;
  login: (username: string, role: CustomerRole) => void;
  signup: (username: string, role: CustomerRole) => void;
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
  const [registeredUsers, setRegisteredUsers] = useState<Map<string, User>>(new Map());

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

  const signup = (name: string, newRole: CustomerRole) => {
    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error("Please enter your name.");
    }

    if (registeredUsers.has(trimmed)) {
      throw new Error("Username already exists. Please choose a different name.");
    }

    const newUser: User = {
      id: Date.now(),
      username: trimmed,
      role: newRole,
    };

    setRegisteredUsers((previous) => new Map(previous).set(trimmed, newUser));
    setUsername(trimmed);
    setRole(newRole);
  };

  const login = (name: string, newRole: CustomerRole) => {
    const trimmed = name.trim();
    if (!trimmed) {
      throw new Error("Please enter your name.");
    }

    const account = registeredUsers.get(trimmed);
    if (!account) {
      throw new Error("Account not found. Please sign up first.");
    }

    if (account.role !== newRole) {
      throw new Error(`Incorrect role for this account. Registered role: ${account.role}.`);
    }

    setUsername(trimmed);
    setRole(newRole);
  };

  const logout = () => {
    setUsername(null);
    setRole(defaultRole);
  };

  const isAuthenticated = username !== null;

  return (
    <CustomerContext.Provider value={{ customers, role, username, isAuthenticated, setRole, login, signup, logout, addCustomer, updateCustomer, deleteCustomer }}>
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
