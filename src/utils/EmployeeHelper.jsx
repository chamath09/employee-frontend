import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    width: "90px",
    
    
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    width: "250px",
    
  },
  {
    name: "Image",
    selector: (row) => row.profileImage,
    width: "120px",
    
    
  },
  {
    name: "Department",
    selector: (row) => row.dep_name,
    width: "150px",
    
    
  },
  {
    name: "DOB",
    selector: (row) => row.dob,
    sortable: true,
    width: "230px",
    
  },
  {
    name: "Action",
    cell: (row) => row.action,
    width: "280px",
    button: true,
    center: true,
  },
];





export const fetchDepartments = async () => {
    let departments
  try {
    const response = await axios.get(
      "https://employee-api-nu.vercel.app/api/departments",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
        departments = response.data.departments
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments
};


// employees for salary forum
export const getEmployees = async (depId) => {
  if (!depId) return [];

  try {
    const res = await axios.get(
      `https://employee-api-nu.vercel.app/api/employees/department/${depId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (res.data.success) {
      return res.data.employees;
    }
    return [];
  } catch (error) {
    console.error("Error fetching employees by department:", error);
    return [];
  }
};




export const EmployeeButtons = ({ id, onDepartmentDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="flex space-x-3 justify-center items-center">
      <button
        className="px-3 py-1 bg-teal-600 text-white rounded text-sm cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/employee/${id}`)}
      >
        View
      </button>
      <button
        className="px-3 py-1 bg-blue-600 text-white rounded text-sm cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/employee/edit/${id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 bg-yellow-600 text-white rounded text-sm cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${id}`)}
      >
        Salary
      </button>
      <button
        className="px-3 py-1 bg-red-600 text-white rounded text-sm cursor-pointer"
        onClick={() => navigate(`/admin-dashboard/leaves/${id}`)}
      >
        Leave
      </button>
    </div>
  );
};