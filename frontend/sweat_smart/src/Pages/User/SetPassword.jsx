import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

const SetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useAuthStore((state) => state.user);
  const setPassword = useAuthStore((state) => state.setPassword);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const result = await setPassword({ userId: user?._id, newPassword });

    if (result.success) {
      alert("Password set successfully! Redirecting to dashboard...");
      navigate("/user-dashboard");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#16222a] to-[#3a6073]">
      <div className="bg-[#1e2f3d] text-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Set Your Password</h2>
        <p className="text-gray-400 text-center mb-6">
          Create a password to secure your account.
        </p>

        {/* Error Message */}
        {error && <p className="text-center bg-red-500 p-2 rounded-md mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">New Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-[#4ab3b6] focus:outline-none"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Confirm Password</label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:ring-2 focus:ring-[#4ab3b6] focus:outline-none"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4ab3b6] hover:bg-[#35888e] text-white font-semibold text-lg p-3 rounded-lg transition duration-300 shadow-lg"
            disabled={loading}
          >
            {loading ? "Setting Password..." : "Set Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPassword;
