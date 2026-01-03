import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  async function handleLogin() {
    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8000/getsub", {
        username,
        password,
      });

      // Store data
      localStorage.setItem("username", username);
      localStorage.setItem("subjects", JSON.stringify(res.data.subjects));
      navigate("/dashboard");
      
    } catch (err) {
      setError("Invalid credentials or server error , msg : " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="fixed inset-0 app-bg" />
      <div className="relative w-full max-w-md rounded-3xl glass-panel p-8 shadow-xl">
        <h1 className="text-2xl font-semibold mb-2 tracking-wide text-accent">
          JIIT Planner
        </h1>
        <p className="text-sm text-muted mb-8">
          Login to view your timetable
        </p>
        {error && (
          <p className="mb-4 text-sm text-red-400">
            {error}
          </p>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="input mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input mb-6"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="btn-primary w-full text-center"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
