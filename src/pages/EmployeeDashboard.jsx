import React from "react";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import AdminSummary from "../components/dashboard/AdminSummary";
import Sidebar from "../components/EmployeeDashboard/Sidebar";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 bg-gray-100 h-screen">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
