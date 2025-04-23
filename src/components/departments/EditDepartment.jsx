import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditDepartment = () => {
    const {id} = useParams(); 
    const [department, setDepartment] = useState([]);
    const [depLoading, setDepLoading] = useState(false);
    const navigate = useNavigate();

    
    useEffect(() => {
      const fetchDepartments = async () => {
        setDepLoading(true);
        try {
          const response = await axios.get(
            `http://localhost:5000/api/departments/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.data.success) {
            setDepartment(response.data.department);
          }
        } catch (error) {
          if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
          }
        } finally {
          setDepLoading(false);
        }
      };

      fetchDepartments();
    }, []);
    
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
        const response = await axios.put(
          `http://localhost:5000/api/departments/${id}`,
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
    }
    
  return (
    <>
      {depLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
          <div className="text-2xl font-bold mb-6">
            <h3>Edit Department</h3>
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
                  value={department.dep_name}
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
                  value={department.dep_description}
                  placeholder="Enter Dep Description"
                  className="text-sm mt-1 w-full p-2 border border-gray-300 rounded-md font-normal"
                />
              </div>

              <button
                type="submit"
                className="w-full  mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit Department
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EditDepartment