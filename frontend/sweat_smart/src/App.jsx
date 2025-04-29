import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import UserLogin from "./Pages/UserLogin";
import AdminLogin from "./Pages/AdminLogin";
import AdminHome from "./Pages/Admin/AdminHome";
import ManageMembers from "./Pages/Admin/ManageMembers";
import CreateMembers from "./Pages/Admin/CreateMembers";
import ManagePackages from "./Pages/Admin/ManagePackages";
import SetPassword from "./Pages/User/SetPassword";
import UpdateMember from "./Pages/Admin/UpdateMember";
import AdminPrivateRoute from "./Pages/Admin/Route Protector/AdminPrivateRoute";
import UserPrivateRoute from "./Pages/User/Route Protector/UserPrivateRoute";
import UserHome from "./Pages/User/UserHome";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected User Routes */}
        <Route
          path="/user-dashboard"
          element={
            <UserPrivateRoute>
              <UserHome />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/set-password"
          element={
            <UserPrivateRoute>
              <SetPassword />
            </UserPrivateRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin-home"
          element={
            <AdminPrivateRoute>
              <AdminHome />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin-manage-members"
          element={
            <AdminPrivateRoute>
              <ManageMembers />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin-create-members"
          element={
            <AdminPrivateRoute>
              <CreateMembers />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin-manage-packages"
          element={
            <AdminPrivateRoute>
              <ManagePackages />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/admin-update-member/:userId"
          element={
            <AdminPrivateRoute>
              <UpdateMember />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
