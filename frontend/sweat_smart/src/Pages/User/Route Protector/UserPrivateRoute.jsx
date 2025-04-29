import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../../../stores/useAuthStore";

const UserPrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || user?.role !== "user") {
    return <Navigate to="/user-login" replace />;
  }

  return children;
};

export default UserPrivateRoute;
