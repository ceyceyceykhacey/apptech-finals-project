export type UserRole = "Admin" | "Staff" | "Customer";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // In production, this would be hashed
  role: UserRole;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
