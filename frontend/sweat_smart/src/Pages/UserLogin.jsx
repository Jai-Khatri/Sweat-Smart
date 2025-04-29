import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore"; 

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await loginUser({ email, password });

    if (result.success) {
      if (result.firstTime) {
          navigate("/set-password"); 
      } else {
          navigate("/user-dashboard");
      }
  }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#16222a] to-[#3a6073]">
      <div className="bg-[#1e2f3d] text-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Welcome Back!</h2>
        <p className="text-gray-400 text-center mb-6">
          Please log in to continue.
        </p>

        {/* Error Message */}
        {error && <p className="text-center bg-red-500 p-2 rounded-md mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-[#4ab3b6] focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-[#4ab3b6] focus:outline-none"
              placeholder="Leave empty if logging in for the first time"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4ab3b6] hover:bg-[#35888e] text-white font-semibold text-lg p-3 rounded-lg transition duration-300 shadow-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Don't have an account?{" "}
          <span className="text-[#4ab3b6] font-semibold hover:underline">
            Kindly ask our admin to add you as a member of our gym
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
