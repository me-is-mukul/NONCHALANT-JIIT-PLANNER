import { Navigate } from "react-router-dom";
function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("username");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
export default PrivateRoute;