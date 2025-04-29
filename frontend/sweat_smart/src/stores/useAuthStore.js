import { create } from "zustand";
import axiosInstance from "../libs/axios.js";

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),

  // Login user
  loginUser: async ({ email, password }) => {
    try {
      const res = await axiosInstance.post("/user/loginUser", { email, password });
      const { user, token, firstTime } = res.data;

      localStorage.setItem("token", token);

      set({ user, token, isAuthenticated: true });

      return { success: true, user, firstTime };
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  // Load user from token on refresh
  loadUserFromToken: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axiosInstance.get("/user/getLoggedInUser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ user: res.data.user, token, isAuthenticated: true });
    } catch (error) {
      console.error("Failed to load user from token:", error.response?.data?.message || error.message);
      localStorage.removeItem("token");
      set({ user: null, token: null, isAuthenticated: false });
    }
  },

  // Fetch user manually
  getUser: async () => {
    const { token, user } = get();
    if (!token || !user?._id) return;

    try {
      const res = await axiosInstance.get(`/user/getUserById/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ user: res.data.user });
    } catch (error) {
      console.error("Failed to fetch user:", error.response?.data?.message || error.message);
    }
  },

  // Set password
  setPassword: async ({ newPassword }) => {
    try {
      const { user } = get();
      const token = localStorage.getItem("token"); 
  
      const res = await axiosInstance.post(
        `/user/updatePassword/${user._id}`,
        { password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      set({ user: res.data.user || user });
  
      return { success: true, message: "Password set successfully!" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Failed to set password.",
      };
    }
  },

  // Logout user
  logout: async () => {
    const { token } = get();
    try {
      await axiosInstance.post(
        "/user/logoutUser",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.removeItem("token");
      set({ user: null, token: null, isAuthenticated: false });
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  },
}));

export default useAuthStore;
