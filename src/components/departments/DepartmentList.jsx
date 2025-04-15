import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, DepartmentButtons } from "../../utils/DepartmentHelper";
import axios from "axios";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [depLoading, setDepLoading] = useState(false);
  const [filteredDepartments, setfilteredDepartments] = useState([])

  // Function to delete department and trigger re-fetch of the department list
  const ondepartmentDelete = async () => {
    // Re-fetch the departments list after a department is deleted
    fetchDepartments();
  };

  // Function to fetch department data from the backend
  const fetchDepartments = async () => {
    setDepLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/departments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        let sno = 1;
        const data = response.data.departments.map((dep) => ({
          _id: dep._id,
          sno: sno++,
          dep_name: dep.dep_name,
          action: (
            <DepartmentButtons
              id={dep._id}
              onDepartmentDelete={ondepartmentDelete}
            />
          ), // Pass the delete handler to buttons
        }));
        setDepartments(data);
        setfilteredDepartments(data); // Initialize filtered departments with all departments
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    } finally {
      setDepLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setfilteredDepartments(records);
    
  }

  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="p-5">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search By Dep Name"
              className="px-4 py-1 border rounded"
              onChange={filterDepartments}
            />
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            <DataTable columns={columns} data={filteredDepartments} pagination/>
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
