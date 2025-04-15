import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking user status
  }

  return user ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoutes;
