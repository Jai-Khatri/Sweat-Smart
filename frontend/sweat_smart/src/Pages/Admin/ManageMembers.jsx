import React, { useEffect } from "react";
import useAdminStore from "../../stores/useAdminStore";
import { Link } from "react-router-dom";

const ManageMembers = () => {
  const { users, getAllUsers, deleteUser, updateUser, loading } = useAdminStore();

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleDelete = (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#16222a] to-[#3a6073] p-8">
      <div className="bg-[#1e2f3d] text-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Manage Members</h2>
        <p className="text-gray-400 text-center mb-6">
          View and manage all gym members.
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
                  <th className="py-3 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-600 hover:bg-gray-700">
                    <td className="py-3 px-6">{user.name}</td>
                    <td className="py-3 px-6">{user.email}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleDelete(user.email)}
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg mr-2"
                      >
                        Delete
                      </button>
                      <Link
                        to={`/admin-update-member/${user._id}`}
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                      >
                        Update
                      </Link>
                    </td>
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

export default ManageMembers;
