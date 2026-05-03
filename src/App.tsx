import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Customers from "./pages/Customers";
import CustomerDetails from "./pages/CustomerDetails";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import { CustomerProvider } from "./context/CustomerContext";

function App() {
  return (
    <CustomerProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/customer/:id" element={<CustomerDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </CustomerProvider>
  );
}

export default App;