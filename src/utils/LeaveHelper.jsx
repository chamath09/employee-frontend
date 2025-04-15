import { useNavigate } from "react-router-dom"

export const columns = [
  {
    name: "S.No",
    selector: (row) => row.sno,
    // sortable: true,
  },
  {
    name: "Emp ID",
    selector: (row) => row.empId,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Department",
    selector: (row) => row.department,
    sortable: true,
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType,
  },
  {
    name: "Days",
    selector: (row) => row.days,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },
  {
    name: "Action",
    cell: (row) => row.action,
  },
];


export const Leavebuttons = ({Id}) => {
    const navigate = useNavigate();

    const handleView = (id) => {
        navigate(`/admin-dashboard/leaves/${id}`)
    }

    return (
        <button 
        className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600 cursor-pointer"
        onClick={() => handleView(Id)}
        >
            View
        </button>
    )
}