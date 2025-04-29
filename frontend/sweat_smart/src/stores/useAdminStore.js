import { create } from "zustand";
import axiosInstance from "../libs/axios.js";

const useAdminStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("authToken") || null,
  users: [],
  packages: [],
  loading: false,

  //login user
  loginUser: async (email, password) => {
    set({ loading: true, error: null });

    try {
        const response = await axiosInstance.post("/admin/login", { email, password });

        if (response.data && response.data.token) {
          localStorage.setItem("authToken", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          set({ user: response.data.user, token: response.data.token, loading: false });
            return { success: true, role: response.data.user.role, message: response.data.message };
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Login failed:", error.response?.data?.message || error.message);
        set({ loading: false, error: error.response?.data?.message || "Login failed" });
        return { success: false, message: error.response?.data?.message || "Login failed" };
    }
},

  //Logout user
  logoutUser: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    set({ user: null, token: null });
},

   getUserById: async (userId) => {
  try {
    const response = await axiosInstance.get(`/admin/getUserById/${userId}`);
    return response.data.user;
  } catch (error) {
    console.error("Error fetching user:", error.response?.data?.message || error.message);
    return null;
  }
},

   //Update member
   updateMember: async (userId, formData) => {
  try {
    const response = await axiosInstance.put(`/admin/updateMember/${userId}`, formData);

    if (!response.data || !response.data.user) {
      throw new Error("Invalid response from server");
    }

    set((state) => ({
      users: state.users.map((user) =>
        user._id === userId ? response.data.user : user
      ),
    }));

    return { success: true, message: "User updated successfully!" };
  } catch (error) {
    console.error("Error updating user:", error.response?.data?.message || error.message);
    return { success: false, message: error.response?.data?.message || "Failed to update user" };
  }
},

  // Fetch All Users
  getAllUsers: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/admin/getAllUsers");
      set({ users: response.data.users, loading: false });
    } catch (error) {
      console.error("Error fetching users:", error.response?.data?.message || error.message);
      set({ loading: false });
    }
  },

  createUser: async (formData) => {
    try {
        const requestData = { ...formData };

        if (formData.role !== "admin") {
            delete requestData.password; 
        } else {
            delete requestData.feePackage; 
        }

        const response = await axiosInstance.post("/admin/createUser", requestData);

        if (!response.data || !response.data.user) {
            throw new Error("Invalid response from server");
        }

        set({ users: [...get().users, response.data.user] });

        return { success: true, message: response.data.message || "User created successfully!" };
    } catch (error) {
        console.error("Error creating user:", error.response?.data?.message || error.message);
        
        return { success: false, message: error.response?.data?.message || "Failed to create user" };
    }
},
  
  // Delete User
  deleteUser: async (email) => {
    try {
      await axiosInstance.post("/admin/deleteUser", { email });
      set({ users: get().users.filter((user) => user.email !== email) });
    } catch (error) {
      console.error("Error deleting user:", error.response?.data?.message || error.message);
    }
  },

  getAllPackages: async () => {
    set({ loading: true });
    try {
      const response = await axiosInstance.get("/package/getAllPackages");
  
      if (!response.data || !Array.isArray(response.data.packages)) {
        throw new Error("Invalid package data received");
      }
  
      set({ packages: response.data.packages, loading: false }); 
    } catch (error) {
      console.error("Error fetching packages:", error.response?.data?.message || error.message);
      set({ packages: [], loading: false });
    }
  },

  // Create New Package
  createPackage: async (name, price, duration) => {
    try {
      const response = await axiosInstance.post("/package/createPackage", { name, price, duration });
  
      if (!response.data || !response.data.package) {
        throw new Error("Failed to create package, response is invalid");
      }
  
      set({ packages: [...get().packages, response.data.package] }); 
  
      return response.data; 
    } catch (error) {
      console.error("Error creating package:", error.response?.data?.message || error.message);
    }
  },
  

  // Delete Package
  deletePackage: async (packageId) => {
    try {
      await axiosInstance.delete(`/package/deletePackage/${packageId}`);
      set({ packages: get().packages.filter((pkg) => pkg._id !== packageId) });
    } catch (error) {
      console.error("Error deleting package:", error.response?.data?.message || error.message);
    }
  },
}));

export default useAdminStore;
