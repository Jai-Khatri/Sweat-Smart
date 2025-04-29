import React, { useState, useEffect } from "react";
import useAdminStore from "../../stores/useAdminStore";

const CreateMembers = () => {
  const { createUser, getAllPackages, packages } = useAdminStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    feePackage: "",
    role: "user",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllPackages();
  }, [getAllPackages]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await createUser(formData);

    if (result) {
      setMessage(result.message);
      if (result.success) {
        setFormData({ name: "", email: "", phone: "", address: "", feePackage: "", role: "user", password: "" });
      }
    } else {
      setMessage("An unexpected error occurred.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#16222a] to-[#3a6073] p-6">
      <div className="bg-[#1e2f3d] text-white p-10 rounded-2xl shadow-2xl max-w-lg w-full">
        <h2 className="text-4xl font-extrabold text-center mb-4">Create Member</h2>
        <p className="text-gray-400 text-center mb-6">Fill out the form below to add a new gym member.</p>

        {message && (
          <div className={`text-center text-lg font-medium p-2 rounded-lg mb-4 ${message.includes("success") ? "bg-green-500" : "bg-red-500"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-300 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-300 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-gray-300 mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Fee Package Dropdown (Only for Users) */}
          {formData.role === "user" && (
            <div>
              <label className="block text-gray-300 mb-2">Fee Package</label>
              <select
                name="feePackage"
                value={formData.feePackage}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
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
          )}

          {/* Password Field (Only for Admins) */}
          {formData.role === "admin" && (
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Member"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMembers;
