import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("button clicked");
    try {
      const { data } = await axios.post(
        "https://the-bg.onrender.com/api/auth/login",
        {
          username,
          password,
        }
      );
      console.log("Login successful", data);
      localStorage.setItem("token", data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 max-h-screen">
      <h1 className="text-2xl font-bold text-center">Admin Login</h1>
      <form onSubmit={handleLogin} className="mt-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="block w-full p-2 border mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full p-2 border mb-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 ">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
