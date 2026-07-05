import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joiningDate: ""
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const getEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get(`/api/employee/${id}`, {
        headers: {
          token
        }
      });

      if (data.success) {
          setEmployee({
          ...data.employee,
          joiningDate: data.employee.joiningDate.split("T")[0]
        });
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem("token");
        const { data } = await api.put(
          `/api/employee/update/${id}`,
           employee,
          {
            headers: {
            token
          }
        }
      );

      if (data.success) {
        toast.success("Employee Updated");
        navigate("/employees");

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getEmployee();
  }, []);

  return (
  <div className="flex h-screen bg-[#F8F4F1] overflow-hidden">

    <Sidebar />

    <div className="flex-1 min-w-0">

      <Navbar />

      <div className="p-8 overflow-y-auto h-[calc(100vh-80px)]">

        

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#5B4036]">
            Edit Employee
          </h1>

          <p className="text-[#8F6F64] mt-2 text-lg">
            Update employee information.
          </p>
        </div>

        

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border border-[#E9DDD7] shadow-md p-10 max-w-2xl mx-auto">

          <div className="space-y-6">

            <div>
              <label className="block text-[#5B4036] font-semibold mb-2">
                Employee Name
              </label>

              <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="Employee Name"
                className="w-full rounded-2xl border border-[#E9DDD7] bg-[#FCFAF8] px-5 py-3 outline-none focus:border-[#B88776]"/>
            </div>

            <div>
              <label className="block text-[#5B4036] font-semibold mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={employee.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full rounded-2xl border border-[#E9DDD7] bg-[#FCFAF8] px-5 py-3 outline-none focus:border-[#B88776]"/>
            </div>

            <div>
              <label className="block text-[#5B4036] font-semibold mb-2">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={employee.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-2xl border border-[#E9DDD7] bg-[#FCFAF8] px-5 py-3 outline-none focus:border-[#B88776]"/>
            </div>

            <div>
              <label className="block text-[#5B4036] font-semibold mb-2">
                Department
              </label>

              <input
                type="text"
                name="department"
                value={employee.department}
                onChange={handleChange}
                placeholder="Department"
                className="w-full rounded-2xl border border-[#E9DDD7] bg-[#FCFAF8] px-5 py-3 outline-none focus:border-[#B88776]"/>
            </div>

            <div>
              <label className="block text-[#5B4036] font-semibold mb-2">
                Designation
              </label>

              <input
                type="text"
                name="designation"
                value={employee.designation}
                onChange={handleChange}
                placeholder="Designation"
                className="w-full rounded-2xl border border-[#E9DDD7] bg-[#FCFAF8] px-5 py-3 outline-none focus:border-[#B88776]"/>
            </div>

            <div>
              <label className="block text-[#5B4036] font-semibold mb-2">
                Salary
              </label>

              <input
                type="number"
                name="salary"
                value={employee.salary}
                onChange={handleChange}
                placeholder="Salary"
                className="w-full rounded-2xl border border-[#E9DDD7] bg-[#FCFAF8] px-5 py-3 outline-none focus:border-[#B88776]"/>
            </div>

            <div>
              <label className="block text-[#5B4036] font-semibold mb-2">
                Joining Date
              </label>

              <input
                type="date"
                name="joiningDate"
                value={employee.joiningDate}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#E9DDD7] bg-[#FCFAF8] px-5 py-3 outline-none focus:border-[#B88776]"/>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <button
              type="submit"
              className="bg-[#B88776] hover:bg-[#A87665] text-white font-semibold px-8 py-3 rounded-2xl shadow-md transition">
                Update Employee
            </button>

            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="border border-[#DCC8BE] hover:bg-[#F8F4F1] text-[#5B4036] font-semibold px-8 py-3 rounded-2xl transition">
                Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>
);

};

export default EditEmployee;