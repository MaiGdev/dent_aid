import { Route, Routes } from "react-router";
import { DashBoard } from "../pages/Dashboard";
import { UserManagement } from "../pages/UserManagement";

export const DentAidRoutes = () => {

  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </>
  );
};
