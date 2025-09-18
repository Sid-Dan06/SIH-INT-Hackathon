import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import OAuthSuccess from "./pages/OAuthSuccess";
import ForgotPassword from "./pages/ForgotPassword";
import AboutUs from "./pages/AboutUs";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import UserSettings from "./pages/UserSettings";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <div className="pt-16">
      <Navbar />
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* OAuth Success Page */}
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* About Us Page */}
        <Route path="/about-us" element={<AboutUs />} />

        {/* Admin and Client Login */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/client-dashboard" element={<ClientDashboard />} />

        {/* User Settings */}
        <Route path="/user-settings" element={<UserSettings />} />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Routes>
    </div>
  );
}
