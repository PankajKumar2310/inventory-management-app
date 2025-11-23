import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authApi } from "../api/authApi";

export default function LoginPage({ onLoginSuccess }) {
  const [mode, setMode] = useState("login"); 
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = form;

    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      if (mode === "register") {
        await authApi.register({ username, password });
        toast.success("Registered successfully. You can now log in.");
       
        setMode("login");
        setForm({ username, password: "" });
        return;
      }

      const { data } = await authApi.login({ username, password });
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", data.user.username);

      if (onLoginSuccess) onLoginSuccess();
      navigate("/", { replace: true });
    } catch (err) {
      const msg = err.response?.data?.message || "Authentication failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="modal-container" style={{ maxWidth: 400, width: "100%" }}>
        <h2>{mode === "login" ? "Login" : "Register"}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? "Need an account? Register" : "Have an account? Login"}
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
