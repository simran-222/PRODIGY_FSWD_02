import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }) => {

  const { token } = useContext(AppContext);

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;