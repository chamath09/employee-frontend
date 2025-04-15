import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments } from "../../utils/EmployeeHelper";
import axios from "axios";

const Edit = () => {
  const [formData, setFormData] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    salary: "",
    department: "",
  });
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [departmentsData, employeeRes] = await Promise.all([
          fetchDepartments(),
          axios.get(`http://localhost:5000/api/employees/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        if (employeeRes.data.success && employeeRes.data.employee) {
          const employee = employeeRes.data.employee;
          setFormData({
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department._id, // Assuming `department` is populated and contains the ID
          });
        }
        setDepartments(departmentsData);
      } catch (error) {
        console.error(error);
        alert("Error fetching data");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "image" ? files[0] : value,
    }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();

   const updatedData = {
     name: formData.name,
     employeeId: formData.employeeId,
     dob: formData.dob,
     gender: formData.gender,
     maritalStatus: formData.maritalStatus,
     designation: formData.designation,
     department: formData.department,
     salary: formData.salary,
   };

   try {
     const response = await axios.put(
       `http://localhost:5000/api/employees/${id}`,
       updatedData,
       {
         headers: {
           Authorization: `Bearer ${localStorage.getItem("token")}`,
           "Content-Type": "application/json", // Set the content type to JSON
         },
       }
     );

     if (response.data.success) {
       navigate("/admin-dashboard/employees");
     } else {
       alert("Failed to update employee.");
     }
   } catch (error) {
     console.error("Error updating employee:", error);
     alert("An error occurred while updating the employee.");
   }
 };


  return (
    <>
      {departments.length && formData ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Marital Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status
                </label>
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                </select>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Department */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dep) => (
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-200 font-bold"
            >
              Update Employee
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center py-10 text-gray-500 text-lg">
          Loading...
        </div>
      )}
    </>
  );
};

export default Edit;
