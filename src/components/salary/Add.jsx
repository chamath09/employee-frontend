import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";

const Add = () => {
  const [formData, setFormData] = useState({
    employeeId: null,
    basicSalary: 0,
    allowance: 0,
    deductions: 0,
    payDate: null,
  });
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

useEffect(() => {
  const fetchData = async () => {
    try {
      const departmentsData = await fetchDepartments();
      setDepartments(departmentsData);

      if (id) {
        const employeeRes = await axios.get(
          `http://localhost:5000/api/employees/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (employeeRes.data.success && employeeRes.data.employee) {
          const employee = employeeRes.data.employee;
          setFormData({
            name: employee.userId.name,
            maritalStatus: employee.maritalStatus,
            designation: employee.designation,
            salary: employee.salary,
            department: employee.department._id,
          });
        }
      }
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


    try {
      const response = await axios.post(
        `http://localhost:5000/api/salary/add`,
        formData,
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

 const handleDepartment = async (e) => {
   const selectedDepId = e.target.value;
   const emps = await getEmployees(selectedDepId);
   setEmployees(emps);

   // Also update formData with selected department
   setFormData((prevData) => ({
     ...prevData,
     department: selectedDepId,
   }));
 };


  return (
    <>
      {departments && employees ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add Salary</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Department */}
              <div >
                <label className="block text-sm font-medium text-gray-700">
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleDepartment}
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

              {/* Employee */}
              <div >
                <label className="block text-sm font-medium text-gray-700">
                  Employee
                </label>
                <select
                  name="employeeId"
                 
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeId}
                    </option>
                  ))}
                </select>
              </div>





              {/* Designation */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Basic Salary
                </label>
                <input
                  type="number"
                  name="basicSalary"
                  placeholder="Basic Salary"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allowances
                </label>
                <input
                  type="number"
                  name="allowance"
                  placeholder="Allowances"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Deductions */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Deductions
                </label>
                <input
                  type="number"
                  name="deductions"
                  placeholder="Deductions"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Pay Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Pay Date
                </label>
                <input
                  type="date"
                  name="payDate"
                  placeholder="Date of Pay"
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition duration-200 font-bold"
            >
              Add Salary
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

export default Add;
