import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
// 🔐 Simple auth check

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* <Route path="*"
            element={
              <Navigate
                to={localStorage.getItem("username") ? "/dashboard" : "/login"}
                replace
              />
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
