import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Employees",
      path: "/employees",
    },
    {
      name: "Add Employee",
      path: "/add-employee",
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-[#7B5345] text-white flex flex-col justify-between shadow-lg">
      <div>

        <div className="px-8 py-10">
          <h1 className="text-4xl font-bold tracking-tight">
            EMS
          </h1>
          <p className="mt-3 text-[#F3E8E3] text-base">
            Employee Management
          </p>
          <p className="text-[#E8D8D0] text-sm">
            Admin Panel
          </p>
        </div>

        
        <div className="px-4 mt-8 flex flex-col gap-2">
          {menuItems.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`px-5 py-3 rounded-xl font-medium text-base transition-all duration-200 ${
                location.pathname === item.path
                  ? "bg-[#C08F7B] text-white shadow-md"
                  : "text-[#F3E8E3] hover:bg-[#8C6253]"
              }`}
            >
              {item.name}
            </Link>
          ))}

        </div>
      </div>

      <div className="px-8 py-6 border-t border-[#9C6D5C]">
        <p className="text-xs text-[#E8D8D0] mt-1">
          Employee Management System
        </p>

      </div>
    </div>
  );
};

export default Sidebar;