import { Route, Routes } from "react-router";
import {
  AppointmentManagement,
  DashBoard,
  DentistSchedule,
  UserDetails,
  UserManagement,
} from "../pages";

export const DentAidRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route
          path="/appointment-management"
          element={<AppointmentManagement />}
        />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/user/:id/schedule" element={<DentistSchedule />} />
      </Routes>
    </>
  );
};
