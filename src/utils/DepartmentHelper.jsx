// DepartmentHelper.js
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    sortable: true,
    width: "200px",
  },
  {
  name: "Department Name",
  selector: (row) => row.dep_name,
  sortable: true,
  grow: 2,
  minWidth: "200px",
  maxWidth: "550px",
}
,
  {
    name: "Action",
    cell: (row) => row.action,
    center: true, // This ensures horizontal centering
    width: "200px", // Optional: adjust based on your layout
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

// DepartmentButtons component
export const DepartmentButtons = ({ id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirm = window.confirm("Do you want to delete this department?");
    if (confirm) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/departments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          onDepartmentDelete(id);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="flex space-x-3 justify-center items-center">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded text-sm"
        onClick={() => navigate(`/admin-dashboard/department/${id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded text-sm"
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
    </div>
  );
};
