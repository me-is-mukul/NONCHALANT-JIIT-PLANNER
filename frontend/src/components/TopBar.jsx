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
    <div className="flex justify-between items-center border-b px-4 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold tracking-wide border-chrome">
      <div className="text-accent">JIIT Planner</div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button className="btn-ghost hidden sm:inline-block" onClick={toggleTheme} aria-label="Toggle theme">
          Switch to {nextLabel}
        </button>
        <button className="btn-ghost sm:hidden" onClick={toggleTheme} aria-label="Toggle theme">
          Theme
        </button>
        <button className="btn-primary" onClick={LogoutHandler}>Logout</button>
      </div>
    </div>
  );
}
