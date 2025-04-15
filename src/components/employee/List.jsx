import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {

const [employees, setEmployees] = useState([]);
const [empLoading, setEmpLoading] = useState(false);
const [filteredEmployees, setfilteredEmployees] = useState([])

  useEffect(() => {
    const fetchEmployees = async () => {
        setEmpLoading(true);
        try {
          const response = await axios.get(
            "https://employee-api-nu.vercel.app/api/employees",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
    
          if (response.data.success) {
            let sno = 1;
            const data = response.data.employees.map((emp) => ({
              _id: emp._id,
              sno: sno++,
              dep_name: emp.department.dep_name,
              name: emp.userId.name,
              dob: new Date(emp.dob).toLocaleDateString(),
              profileImage: (
                <img
                  width={40}
                  className="rounded-full"
                  src={`"https://employee-api-nu.vercel.app/${emp.userId.profileImage}`}
                />
              ),
              action: <EmployeeButtons id={emp._id} />, // Pass the delete handler to buttons
            }));
            setEmployees(data);
            setfilteredEmployees(data);
             // Initialize filtered departments with all departments
          }
        } catch (error) {
          if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
          }
        } finally {
          setEmpLoading(false);
        }
      };

      fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm)
    );
    setfilteredEmployees(records);
  };


  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Name"
          className="px-4 py-1 border rounded"
          onChange={handleFilter}
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>
      <div className="mt-6">
        <DataTable columns={columns} data={filteredEmployees} pagination />
      </div>
    </div>
  );
}

export default List
