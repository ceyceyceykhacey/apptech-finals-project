import { createContext, useContext, useState, type ReactNode } from "react";
import type { Customer } from "../types/Customer";

interface CustomerContextValue {
  customers: Customer[];
  addCustomer: (customer: Omit<Customer, "id" | "createdAt">) => void;
  updateCustomer: (customer: Customer) => void;
  deleteCustomer: (id: number) => void;
  searchCustomers: (query: string) => Customer[];
  filterCustomers: (filters: { email?: string; address?: string }) => Customer[];
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const addCustomer = (customerData: Omit<Customer, "id" | "createdAt">) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now(),
      createdAt: new Date(),
    };
    setCustomers((previous) => [...previous, newCustomer]);
  };

  const updateCustomer = (customer: Customer) => {
    setCustomers((previous) =>
      previous.map((item) => (item.id === customer.id ? customer : item))
    );
  };

  const deleteCustomer = (id: number) => {
    setCustomers((previous) => previous.filter((item) => item.id !== id));
  };

  const searchCustomers = (query: string): Customer[] => {
    const lowerQuery = query.toLowerCase();
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(lowerQuery) ||
        customer.email.toLowerCase().includes(lowerQuery)
    );
  };

  const filterCustomers = (filters: { email?: string; address?: string }): Customer[] => {
    return customers.filter((customer) => {
      if (filters.email && !customer.email.toLowerCase().includes(filters.email.toLowerCase())) {
        return false;
      }
      if (
        filters.address &&
        !customer.addresses.some((addr) =>
          addr.value.toLowerCase().includes(filters.address!.toLowerCase())
        )
      ) {
        return false;
      }
      return true;
    });
  };

  return (
    <CustomerContext.Provider
      value={{
        customers,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        searchCustomers,
        filterCustomers,
      }}
    >
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
