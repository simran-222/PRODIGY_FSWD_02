import { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import api from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/api/admin/login", {
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Welcome Back");
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (

    <div className="min-h-screen bg-[#F8F4F1] flex">
    <div className="hidden lg:flex w-1/2 bg-[#7B5345] items-center justify-center p-16">
        
        <div>
          <h1 className="text-5xl font-bold text-white leading-tight">
            Employee
            <br />
            Management
            <br />
            System
          </h1>
          <p className="mt-8 text-[#F3E8E3] text-lg leading-8 max-w-md">
            Manage employees, departments and records with
            a simple, secure and elegant experience.
          </p>
        </div>
      </div>

      

      <div className="flex-1 flex items-center justify-center px-6">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white rounded-[32px] shadow-lg w-full max-w-md p-9 border border-[#EFE3DD]">
          <p className="text-[#B88776] uppercase tracking-[0.25em] text-sm font-semibold">
            ADMIN LOGIN
          </p>
          <h2 className="text-4xl font-bold text-[#4F352C] mt-3">
            Admin Login
          </h2>
          <p className="text-[#8F6F64] mt-3 mb-8">
            Enter your administrator credentials to continue.
          </p>

          <div className="space-y-5">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-[#E8D8D0] bg-[#FCFAF8] px-5 py-4 outline-none focus:border-[#B88776] transition-all duration-200"/>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-[#E8D8D0] bg-[#FCFAF8] px-5 py-4 outline-none focus:border-[#B88776] transition-all duration-200"/>
          </div>

          <button
            type="submit"
            className="w-full mt-8 rounded-2xl bg-[#B88776] hover:bg-[#A87665] active:scale-[0.98] text-white py-4 font-semibold text-lg transition-all duration-200 shadow-md">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;