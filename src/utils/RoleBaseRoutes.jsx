import React from "react";
import { useAuth } from "../context/authContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if user's role is allowed
  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  // Render children if user has the required role
  return children;
};

export default RoleBaseRoutes;
