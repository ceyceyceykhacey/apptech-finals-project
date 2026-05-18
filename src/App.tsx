import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CustomerProvider } from "./context/CustomerContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import CustomerDetails from "./pages/CustomerDetails";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <CustomerProvider>
        <NavBar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - Authenticated users only */}
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />

          {/* Admin and Staff only */}
          <Route
            path="/customers"
            element={<ProtectedRoute element={<Customers />} requiredRoles={["Admin", "Staff"]} />}
          />
          <Route
            path="/customer/:id"
            element={
              <ProtectedRoute element={<CustomerDetails />} requiredRoles={["Admin", "Staff"]} />
            }
          />

          {/* Admin only */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} requiredRoles={["Admin"]} />}
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CustomerProvider>
    </AuthProvider>
  );
}

export default App;