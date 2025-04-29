import React from "react";
import { Navigate } from "react-router-dom";
import useAdminStore from "../../../stores/useAdminStore";

const AdminPrivateRoute = ({ children }) => {
  const { user } = useAdminStore();

  const isAdminLoggedIn = user?.role === "admin";

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminPrivateRoute;
