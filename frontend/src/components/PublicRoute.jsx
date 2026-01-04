import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("username");

  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
}

export default PublicRoute;
