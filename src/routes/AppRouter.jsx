import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../auth/router/AuthRouter";
import { DentAidRoutes } from "../dentaid/router/DentAidRoutes";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/dentaid/*" element={<DentAidRoutes />} />

      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes>
  );
};
