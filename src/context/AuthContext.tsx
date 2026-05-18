import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { User, UserRole } from "../types/User";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Simple in-memory storage for users (in production, use a database)
const registeredUsers: Map<string, User> = new Map();
let nextUserId = 1;

// Initialize with demo users
const initializeDemoUsers = () => {
  if (registeredUsers.size === 0) {
    const demoUsers: User[] = [
      {
        id: nextUserId++,
        username: "admin",
        email: "admin@example.com",
        password: "password123",
        role: "Admin",
        createdAt: new Date(),
      },
      {
        id: nextUserId++,
        username: "staff",
        email: "staff@example.com",
        password: "password123",
        role: "Staff",
        createdAt: new Date(),
      },
      {
        id: nextUserId++,
        username: "customer",
        email: "customer@example.com",
        password: "password123",
        role: "Customer",
        createdAt: new Date(),
      },
    ];
    demoUsers.forEach((user) => registeredUsers.set(user.username, user));
    localStorage.setItem("registeredUsers", JSON.stringify(demoUsers));
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    initializeDemoUsers();
    
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to load user from localStorage", e);
      }
    }
    // Load registered users from localStorage
    const savedUsers = localStorage.getItem("registeredUsers");
    if (savedUsers) {
      try {
        const users = JSON.parse(savedUsers);
        registeredUsers.clear();
        users.forEach((user: User) => {
          registeredUsers.set(user.username, user);
        });
        nextUserId = Math.max(...users.map((u: User) => u.id), 0) + 1;
      } catch (e) {
        console.error("Failed to load registered users", e);
      }
    }
  }, []);

  const saveUsersToStorage = () => {
    const users = Array.from(registeredUsers.values());
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const foundUser = registeredUsers.get(username);
      if (!foundUser || foundUser.password !== password) {
        throw new Error("Invalid username or password");
      }

      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (registeredUsers.has(username)) {
        throw new Error("Username already exists");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      const newUser: User = {
        id: nextUserId++,
        username,
        email,
        password, // In production, this would be hashed
        role,
        createdAt: new Date(),
      };

      registeredUsers.set(username, newUser);
      saveUsersToStorage();

      setUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
