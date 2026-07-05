import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

const Employees = () => {
 const [employees, setEmployees] = useState([]);
 const getEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/api/employee/all", {
          headers: {
          token,
        },
      });

      if (data.success) {
        setEmployees(data.employees);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const deleteEmployee = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;
  try {
    const token = localStorage.getItem("token");
    const { data } = await api.delete(
      `/api/employee/delete/${id}`,
      {
        headers: {
          token,
        },
      }
    );

    if (data.success) {
      toast.success("Employee Deleted");
      getEmployees();

    } else {
      toast.error(data.message);
    }

  } catch (error) {
      toast.error(error.message);
  }
};

  return (
    <div className="flex min-h-screen bg-[#F8F4F1] overflow-hidden">

      <Sidebar />

      <div className="w-full">

        <Navbar />

        <div className="p-8 w-full overflow-x-auto">
        <div className="flex items-center justify-between mb-8">

        <div>
        <h1 className="text-4xl font-bold text-[#5B4036]">
          Employees
        </h1>
        <p className="text-[#8F6F64] mt-2">
          Manage all employee records.
        </p>
      </div>

        <Link
          to="/add-employee"
          className="bg-[#B88776] hover:bg-[#A87665] text-white px-6 py-5 rounded-2xl shadow-md transition">
            + Add Employee
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-[#E9DDD7] shadow-md overflow-x-auto">
      <table className="w-full">
      <thead className="bg-[#F7EFEB] text-[#8F6F64] uppercase tracking-widest text-sm">
        <tr>
          <th className="px-4 py-5 text-left">
            Employee ID
          </th>

          <th className="px-4 py-5 text-left">
            Name
          </th>

          <th className="px-4 py-5 text-left">
            Email
          </th>

          <th className="px-4 py-5 text-left">
            Department
          </th>

          <th className="px-4 py-5 text-left">
            Designation
          </th>

          <th className="px-4 py-5 text-left">
            Salary
          </th>

          <th className="px-4 py-5 text-center">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {employees.length > 0 ? (
          employees.map((item) => (

            <tr
              key={item._id}
              className="border-t border-[#F2E5DE] hover:bg-[#FCFAF8] transition">

              <td className="px-4 py-5 font-medium text-[#5B4036]">
                {item.employeeId}
              </td>

              <td className="px-4 py-5 font-semibold text-[#5B4036]">
                {item.name}
              </td>

              <td className="px-4 py-5 text-[#8F6F64]">
                {item.email}
              </td>

              <td className="px-4 py-5">
                <span className="bg-[#F7EFEB] text-[#8F6F64] px-2 py-1 rounded-full text-xs">
                  {item.department}
                </span>
              </td>

              <td className="px-4 py-5 text-[#5B4036]">
                {item.designation}
              </td>

              <td className="px-4 py-5 font-semibold text-[#5B4036]">
                ₹{item.salary}
              </td>

              <td className="px-4 py-5">
              <div className="flex justify-center gap-2">
              <Link
                to={`/edit-employee/${item._id}`}
                className="bg-[#B88776] hover:bg-[#A87665] text-white px-3 py-2 rounded-xl text-sm transition">
                  Edit
              </Link>

              <button
                onClick={() => deleteEmployee(item._id)}
                className="border border-red-300 text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl text-sm transition">
                  Delete
              </button>
            </div>
          </td>
        </tr>
        ))
        ) : (
        <tr>
            <td
              colSpan="7"
              className="text-center py-16 text-[#8F6F64]">
              <p className="text-xl font-semibold">
                No Employees Found
              </p>
              <p className="mt-2">
                Click "Add Employee" to create your first employee.
              </p>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  </div>
  </div>
  </div>
);
};

export default Employees;