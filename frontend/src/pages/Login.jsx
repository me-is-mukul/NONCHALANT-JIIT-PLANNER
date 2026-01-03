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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0b0615] to-black text-purple-100">
      <div className="w-full max-w-md rounded-3xl border border-purple-900/40 bg-black/50 backdrop-blur p-8 shadow-xl shadow-purple-900/30">
        <h1 className="text-2xl font-semibold mb-2 tracking-wide">
          JIIT Planner
        </h1>
        <p className="text-sm text-purple-400 mb-8">
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
          className="w-full mb-4 bg-black/40 border border-purple-900/40 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 bg-black/40 border border-purple-900/40 px-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 transition font-medium disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
