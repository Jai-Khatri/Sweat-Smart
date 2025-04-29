import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import axiosInstance from "../../libs/axios"; 
import dayjs from "dayjs";

const UserHome = () => {
  const { user, isAuthenticated, logout, loadUserFromToken } = useAuthStore();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(user);
  const [feePackageDuration, setFeePackageDuration] = useState(null);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    if (!user) {
      loadUserFromToken();
    }
  }, [user, loadUserFromToken]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/user-login");
    } else {
      setUserData(user);
      if (user?.feePackage) {
        fetchPackageDuration(user.feePackage);
      }
      setLoading(false);
    }
  }, [isAuthenticated, user, navigate]);

  const fetchPackageDuration = async (packageId) => {
    try {
      const res = await axiosInstance.get(`/package/${packageId}`);
      setFeePackageDuration(res.data.duration);
    } catch (error) {
      console.error("Error fetching package duration:", error);
      setFeePackageDuration("Not Available");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/user-login");
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;  
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#16222a] to-[#3a6073] text-white flex flex-col items-center justify-center p-6">
      <div className="bg-[#1c2a38] rounded-3xl shadow-xl p-10 w-full max-w-4xl text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-200 mb-6">
          Welcome, {userData?.name || "User"}!
        </h1>
        <p className="text-xl font-semibold mb-8">Here's your personalized dashboard</p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
          <div className="bg-[#2e3b4e] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold">Email</h2>
            <p className="mt-1 text-sm">{userData?.email}</p>
          </div>

          <div className="bg-[#2e3b4e] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold">Membership Duration</h2>
            <p className="mt-1 text-sm">
              {feePackageDuration || "Not Assigned"}
            </p>
          </div>

          <div className="bg-[#2e3b4e] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 col-span-2 lg:col-span-3">
            <h2 className="text-xl font-semibold">Diet Plan</h2>
            <p className="mt-1 text-sm">{userData?.dietPlan || "Not Available"}</p>
          </div>

          <div className="bg-[#2e3b4e] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold">Member Since</h2>
            <p className="mt-1 text-sm">
              {dayjs(userData?.createdAt).format("MMMM D, YYYY")}
            </p>
          </div>

          <div className="bg-[#2e3b4e] p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <h2 className="text-xl font-semibold">Current Date</h2>
            <p className="mt-1 text-sm">
              {dayjs().format("MMMM D, YYYY")}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-8 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserHome;
