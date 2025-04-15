import React from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";

const List = () => {

  // const {user} = useAuth()
  const [leaves, setLeaves] = useState(null);
  let sno = 1;
  const {id} = useParams()
  // const {empId} = useParams()
  // const id = user.role === "admin" ? user._id : empId

   const fetchLeaves = async () => {
     try {
       const response = await axios.get(
         `http://localhost:5000/api/leave/${id}`,
         {
           headers: {
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         }
       );
       if (response.data.success) {
         setLeaves(response.data.leaves);
       }
     } catch (error) {
       if (error.response && !error.response.data.success) {
         alert(error.response.data.error);
       }
     }
   };

    useEffect(() => {
      fetchLeaves();
    }, []);


    if(!leaves) {
      return <div>Loading ...</div>
    }

  return (
    <div className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Leaves</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search By Name"
          className="px-4 py-1 border rounded"
          //   onChange={handleFilter}
        />

        <Link
          to="/employee-dashboard/add-leave"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Leave
        </Link>
      </div>
      <div className="mt-6">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3">S.No</th>
              <th className="px-6 py-3">Leave type</th>
              <th className="px-6 py-3">From</th>
              <th className="px-6 py-3">To</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr className="bg-white border-b border-gray-200" key={leave._id}>
                <td className="px-6 py-3">{sno++}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>

                <td className="px-6 py-3">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-3">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List