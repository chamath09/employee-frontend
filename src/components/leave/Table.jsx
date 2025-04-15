import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { columns } from "../../utils/LeaveHelper";
import { Leavebuttons } from "../../utils/LeaveHelper";

const Table = () => {
  const [leaves, setLeaves] = useState([]);
  const [filterLeaves, setFilterLeaves] = useState([]);


  const fetchLeaves = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/leave", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.data.success) {
        let sno = 1;


        const data = response.data.leaves.map((leave) => ({
          _id: leave._id,
          sno: sno++,
          name: leave.employeeId?.userId?.name || "N/A",
          empId: leave.employeeId?.employeeId,
          department: leave.employeeId?.department?.dep_name || "N/A",
          leaveType: leave.leaveType || "N/A",
          days:
            (new Date(leave.endDate).getTime() -
              new Date(leave.startDate).getTime()) /
              (1000 * 60 * 60 * 24) +
            1,
          status: leave.status || "Pending",
          action: <Leavebuttons Id={leave._id} />,
        }));




        setLeaves(data);
        setFilterLeaves(data);
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

  const filterByInput = (e) => {
    const data = leaves.filter((leave) =>
      leave.empId?.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilterLeaves(data) 
  }
  const filterByButton = (status) => {
    const data = leaves.filter((leave) =>
      leave.status?.toLowerCase().includes(status.toLowerCase())
    );

    setFilterLeaves(data);
  };

  

  return (
    <>
      {filterLeaves ? (
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Leaves</h3>
          </div>
          <div className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Search By Emp Id"
              className="px-4 py-1 border rounded"
              onChange={filterByInput}
            />

            <div className="space-x-3">
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
                onClick={() => filterByButton("Pending")}
              >
                Pending
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
                onClick={() => filterByButton("Approved")}
              >
                Approved
              </button>
              <button
                className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
                onClick={() => filterByButton("Rejected")}
              >
                Rejected
              </button>
            </div>
          </div>

          <div className="mt-3">
            <DataTable columns={columns} data={filterLeaves} pagination />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Table;
