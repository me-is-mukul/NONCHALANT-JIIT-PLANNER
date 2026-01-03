import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();
  function LogoutHandler() {
    localStorage.removeItem("username");
    localStorage.removeItem("subjects");
    navigate("/login");
  }
  return (
    <div className="flex justify-between items-center border-b border-purple-900/40 px-8 py-4 text-xl font-semibold tracking-wide">
      <div className="text-purple-300">JIIT Planner</div> 
      <button className="bg-purple-600 hover:bg-purple-500 px-6 py-2 rounded-lg font-medium transition" onClick={LogoutHandler}>Logout</button>
    </div>
  );
}
