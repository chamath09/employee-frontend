import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    dep_description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://employee-api-nu.vercel.app/api/departments/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <div className="text-2xl font-bold mb-6">
        <h3>Add New Department</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="dep_name"
              className="text-sm font-medium text-gray-700"
            >
              Department Name
            </label>
            <input
              type="text"
              id="dep_name"
              name="dep_name"
              onChange={handleChange}
              placeholder="Enter Dep Name"
              className="text-sm mt-1 w-full p-2 border border-gray-300 rounded-md font-normal"
            />
          </div>
          <div>
            <label
              htmlFor="dep_name"
              className="text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              type="text"
              id="dep_description"
              name="dep_description"
              onChange={handleChange}
              placeholder="Enter Dep Description"
              className="text-sm mt-1 w-full p-2 border border-gray-300 rounded-md font-normal"
            />
          </div>

          <button
            type="submit"
            className="w-full  mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
