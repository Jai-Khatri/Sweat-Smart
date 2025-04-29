import React, { useEffect } from "react";
import useAdminStore from "../../stores/useAdminStore"; 

const AdminHome = () => {
  const { users, loading, getAllUsers } = useAdminStore();

  useEffect(() => {
    getAllUsers(); 
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#16222a] to-[#3a6073] p-8">
      <div className="bg-[#1e2f3d] text-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h2>
        <p className="text-gray-400 text-center mb-6">
          All gym members and their details.
        </p>

        {loading ? (
          <p className="text-center text-gray-400">Loading members...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-400">No members found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <thead className="bg-[#4ab3b6] text-white">
                <tr>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Phone</th>
                  <th className="py-3 px-6 text-left">Address</th>
                  <th className="py-3 px-6 text-left">Fee Package</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-600 hover:bg-gray-700">
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">{user.phone}</td>
                    <td className="py-3 px-6">{user.address}</td>
                    <td className="py-3 px-6">{user.feePackage ? user.feePackage.name : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHome;
