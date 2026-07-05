import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    recentEmployees: [],
  });

  const getDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/api/admin/dashboard", {
        headers: {
          token,
        },
      });

      if (data.success) {
        setDashboard(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
  <div className="flex min-h-screen bg-[#F8F4F1]">
    <Sidebar />

    <div className="flex-1">
      <Navbar />

      <div className="p-8">

        
        <div className="bg-[#B88776] rounded-3xl p-8 shadow-lg">
          <h1 className="text-4xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-[#F5ECE8] mt-3 text-lg">
            Welcome!
          </p>
          <p className="text-[#F8F4F1] mt-2">
            Manage employees, departments and records from one place.
          </p>
        </div>

        <div className="mt-8">

           <div>
            <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl shadow-md border border-[#E9DDD7] p-7">
                <p className="text-[#A47B6A] uppercase text-sm tracking-widest">
                  Employees
                </p>
                <h2 className="text-5xl font-bold text-[#5B4036] mt-5">
                  {dashboard.totalEmployees}
                </h2>
            </div>

              <div className="bg-white rounded-3xl shadow-md border border-[#E9DDD7] p-7">
                <p className="text-[#A47B6A] uppercase text-sm tracking-widest">
                  Departments
                </p>
                <h2 className="text-5xl font-bold text-[#5B4036] mt-5">
                  {dashboard.totalDepartments}
                </h2>
              </div>

              <div className="bg-white rounded-3xl shadow-md border border-[#E9DDD7] p-7">
                <p className="text-[#A47B6A] uppercase text-sm tracking-widest">
                  Recent
                </p>
                <h2 className="text-5xl font-bold text-[#5B4036] mt-5">
                  {dashboard.recentEmployees.length}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-white mt-10 rounded-3xl border border-[#E9DDD7] shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#5F4338]">
            Recent Employees
          </h2>

          <button
            onClick={() => navigate("/employees")}
            className="text-[#B88776] font-semibold hover:underline">
              View All →
          </button>

        </div>

          {dashboard.recentEmployees.length === 0 ? (
          <p className="text-[#8F6F64]">
            No employees found.
          </p>

      ) : (

          <div className="space-y-4">
          {dashboard.recentEmployees.map((emp) => (

          <div
            key={emp._id}
            className="flex items-center justify-between border-b border-[#F2E5DE] pb-4">
          <div>
            <h3 className="font-semibold text-[#5F4338]">
              {emp.name}
            </h3>
            <p className="text-sm text-[#8F6F64]">
              {emp.department}
            </p>
          </div>

          <p className="text-sm text-[#B88776]">
            {emp.email}
          </p>
        </div>
      ))}
    </div>
  )}
</div>
</div>
</div>
</div>
</div>
);
};

export default Dashboard;