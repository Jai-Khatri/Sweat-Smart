import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAdminStore from "../stores/useAdminStore";

const AdminLogin = () => {
  const { loginUser, loading } = useAdminStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Admin Login Attempt:", { email, password }); 
  
    const result = await loginUser(email, password); 
  
    console.log("Login Result:", result); 
  
    if (result.success) {
      setMessage({ type: "success", text: result.message });
  
      setTimeout(() => {
        if (result.role === "admin") {
          navigate("/admin-home"); 
        } else {
          navigate("/user-dashboard"); 
        }
      }, 500);
    } else {
      setMessage({ type: "error", text: result.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#16222a] to-[#3a6073]">
      <div className="bg-[#1e2f3d] text-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Portal</h2>
        <p className="text-gray-400 text-center mb-6">
          Please log in to manage the system.
        </p>

        {/* Security Notice */}
        <p className="text-sm text-center text-[#e74c3c] bg-[#2c3e50] p-3 rounded-lg mb-6">
          <strong>Security Notice:</strong> This portal is for authorized administrators only.
          Unauthorized access is strictly prohibited.
        </p>

        {message && (
          <div className={`text-center p-3 rounded-lg mb-4 ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Admin Email</label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-[#e74c3c] focus:outline-none"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-[#e74c3c] focus:outline-none"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#e74c3c] hover:bg-[#c0392b] text-white font-semibold text-lg p-3 rounded-lg transition duration-300 shadow-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Admin Login"}
          </button>
        </form>

        {/* Redirect to User Login */}
        <p className="text-gray-400 text-center mt-6">
          Not an admin?{" "}
          <Link to="/user-login" className="text-[#4ab3b6] font-semibold hover:underline">
            Go to User Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
