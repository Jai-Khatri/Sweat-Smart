import React, { useEffect, useState } from "react";
import useAdminStore from "../../stores/useAdminStore";

const DURATIONS = ["1 Month", "3 Months", "6 Months", "1 Year", "2 Years"];

const ManagePackages = () => {
  const { packages, getAllPackages, createPackage, deletePackage } = useAdminStore();
  
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    duration: DURATIONS[0],
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

    try {
      const result = await createPackage(formData.name, formData.price, formData.duration);

      if (!result || !result.message) {
        throw new Error("Unexpected error. Please try again.");
      }

      setMessage(result.message);

      if (result.success) {
        setFormData({ name: "", price: "", duration: DURATIONS[0] });
        getAllPackages();
      }
    } catch (error) {
      setMessage(error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (packageId) => {
    await deletePackage(packageId);
    getAllPackages();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#16222a] to-[#3a6073] p-6">
      {/* Create Package Form */}
      <div className="bg-[#1e2f3d] text-white p-10 rounded-2xl shadow-2xl max-w-lg w-full mb-8">
        <h2 className="text-4xl font-extrabold text-center mb-4">Create Package</h2>
        <p className="text-gray-400 text-center mb-6">Fill out the form to add a new gym package.</p>

        {message && (
          <div
            className={`text-center text-lg font-medium p-2 rounded-lg mb-4 ${
              message.includes("Successfully") ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Package Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Duration</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              required
            >
              {DURATIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-lg font-bold transition duration-300"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Package"}
          </button>
        </form>
      </div>

      {/* View and Delete Packages */}
      <div className="bg-[#1e2f3d] text-white p-8 rounded-2xl shadow-2xl max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Manage Packages</h2>

        {packages.length === 0 ? (
          <p className="text-center text-gray-400">No packages available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-[#4ab3b6] text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Package Name</th>
                  <th className="py-3 px-6 text-left">Price ($)</th>
                  <th className="py-3 px-6 text-left">Duration</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(packages) && packages.length > 0 ? (
                  packages.map((pkg) => (
                    <tr key={pkg?._id} className="border-b border-gray-600 hover:bg-gray-700">
                      <td className="py-3 px-6">{pkg?.name || "N/A"}</td>
                      <td className="py-3 px-6">{pkg?.price || "N/A"}</td>
                      <td className="py-3 px-6">{pkg?.duration || "N/A"}</td>
                      <td className="py-3 px-6">
                        <button
                          onClick={() => handleDelete(pkg._id)}
                          className="bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded-lg transition duration-300"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-400">
                      No packages available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePackages;
