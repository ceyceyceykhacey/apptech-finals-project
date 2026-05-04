import type { ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import CustomerDetails from "./pages/CustomerDetails";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import { CustomerProvider, useCustomerContext } from "./context/CustomerContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useCustomerContext();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  const { isAuthenticated } = useCustomerContext();

  return (
    <>
      {isAuthenticated && <NavBar />}
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path="/customer/:id" element={<ProtectedRoute><CustomerDetails /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <CustomerProvider>
      <AppRoutes />
    </CustomerProvider>
  );
}

export default App;
