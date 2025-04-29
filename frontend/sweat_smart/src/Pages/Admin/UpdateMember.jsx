import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAdminStore from "../../stores/useAdminStore";

const UpdateMember = () => {
  const { userId } = useParams(); 
  const navigate = useNavigate();

  const { getUserById, updateMember, getAllPackages, packages } = useAdminStore();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ feePackage: "", dietPlan: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserById(userId);
      if (userData) {
        setUser(userData);
        setFormData({
          feePackage: userData.feePackage || "",
          dietPlan: userData.dietPlan || "",
        });
      }
    };

    getAllPackages();
    fetchUserData();
  }, [userId, getUserById, getAllPackages]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await updateMember(userId, formData);
    if (result.success) {
      setMessage({ text: "Member updated successfully!", type: "success" });
      setTimeout(() => navigate("/admin-manage-members"), 1000);
    } else {
      setMessage({ text: result.message, type: "error" });
    }

    setLoading(false);
  };

  if (!user) return <div className="text-center text-white">Loading user data...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#16222a] to-[#3a6073] p-6">
      <div className="bg-[#1e2f3d] text-white p-10 rounded-2xl shadow-2xl max-w-2xl w-full">
        <h2 className="text-4xl font-extrabold text-center mb-6">Update Member</h2>
        <p className="text-gray-400 text-center mb-6">Modify membership details below.</p>

        {message && (
          <div className={`text-center p-3 rounded-lg mb-4 ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
            {message.text}
          </div>
        )}

        {/* User Details Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4 border-b pb-2">Member Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400 text-sm">Full Name</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <p className="text-lg font-semibold">{user.phone}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Address</p>
              <p className="text-lg font-semibold">{user.address}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Role</p>
              <p className={`text-lg font-semibold ${user.role === "admin" ? "text-red-400" : "text-green-400"}`}>
                {user.role}
              </p>
            </div>
          </div>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Fee Package Dropdown */}
          <div>
            <label className="block text-gray-300 mb-2">Fee Package</label>
            <select
              name="feePackage"
              value={formData.feePackage}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              disabled={user.role === "admin"}
              required
            >
              <option value="">Select a package</option>
              {packages.map((pkg) => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.name} - ${pkg.price} ({pkg.duration})
                </option>
              ))}
            </select>
          </div>

          {/* Diet Plan Input */}
          <div>
            <label className="block text-gray-300 mb-2">Diet Plan</label>
            <input
              type="text"
              name="dietPlan"
              value={formData.dietPlan}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition duration-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Member"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMember;
