import { Route, Routes } from "react-router";
import {
  AppointmentManagement,
  DashBoard,
  DentistSchedule,
  UserDetails,
  UserManagement,
} from "../pages";
import { Appointment } from "../pages/Appointment";

export const DentAidRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/appointments" element={<AppointmentManagement />} />
        <Route path="/appointments/:id" element={<Appointment />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/user/:id/schedule" element={<DentistSchedule />} />
      </Routes>
    </>
  );
};
