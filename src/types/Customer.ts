import type { Address } from "./Address";
import type { Contact } from "./Contact";

export interface Customer {
  id: number;
  name: string;
  email: string;
  addresses: Address[];
  contacts: Contact[];
  createdAt: Date;
  notes?: string;
}