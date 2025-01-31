import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../auth/router/AuthRouter";
import { DentAidRoutes } from "../dentaid/router/DentAidRoutes";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = () => {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/dentaid/*" element={<DentAidRoutes />} />
          <Route path="/*" element={<Navigate to={"/dentaid/dashboard"} />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        </>
      )}
    </Routes>
    /*     <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/dentaid/*" element={<DentAidRoutes />} />

      <Route path="/*" element={<Navigate to={"/auth/login"} />} />
    </Routes> */
  );
};
