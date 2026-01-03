import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme";

export default function TopBar() {
  const navigate = useNavigate();
  const { toggleTheme, nextLabel } = useTheme();
  function LogoutHandler() {
    localStorage.removeItem("username");
    localStorage.removeItem("subjects");
    navigate("/login");
  }
  return (
    <div className="flex justify-between items-center border-b px-8 py-4 text-lg font-semibold tracking-wide border-chrome">
      <div className="text-accent">JIIT Planner</div>
      <div className="flex items-center gap-3">
        <button className="btn-ghost" onClick={toggleTheme} aria-label="Toggle theme">
          Switch to {nextLabel}
        </button>
        <button className="btn-primary" onClick={LogoutHandler}>Logout</button>
      </div>
    </div>
  );
}
