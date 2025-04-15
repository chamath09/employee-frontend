import React from 'react'
import { useAuth } from '../../context/authContext';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const { user } = useAuth();
  const [leave, setLeave] = useState({
    userId: user._id,
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  // Sample check in your auth middleware
  // console.log("Auth middleware user:", req.user);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting leave data:", leave);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/leave/add",
        leave,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Server response:", response.data);
      if (response.data.success) {
        navigate("/employee-dashboard/leaves");
      }
    } catch (error) {
      console.error("Error submitting leave:", error);
      if (error.response) {
        console.error("Server error response:", error.response.data);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Request for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={leave.leaveType}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="sick">Sick Leave</option>
              <option value="casual">Casual Leave</option>
              <option value="annual">Annual Leave</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                From Date
              </label>
              <input
                type="date"
                name="startDate"
                value={leave.startDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* To date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                To Date
              </label>
              <input
                type="date"
                name="endDate"
                value={leave.endDate}
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Reason
              </label>
              <textarea
                name="reason"
                value={leave.reason}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-md"
                rows={4}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add