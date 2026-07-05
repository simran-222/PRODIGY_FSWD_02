import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (

    <div className="bg-[#F8F4F1] border-b border-[#E8D8D0] px-8 py-5 flex items-center justify-between">

      <div>

        <h2 className="text-xl font-bold text-[#4F352C]">
          Employee Management System
        </h2>

        <p className="text-sm text-[#8F6F64]">
          Admin Panel
        </p>

      </div>

      <button
        onClick={logout}
        className="bg-[#B88776] hover:bg-[#A87665] text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-md">
        Logout
      </button>

    </div>

  );

};

export default Navbar;