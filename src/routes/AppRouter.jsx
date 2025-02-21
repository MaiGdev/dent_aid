import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import { RegisterPage } from "../auth/pages/Register";
import { AuthRoutes } from "../auth/router/AuthRouter";
import { DentAidRoutes } from "../dentaid/router/DentAidRoutes";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  const { status, user, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <Routes>
      {status === "authenticated" ? (
        <>
          <Route path="/dentaid/*" element={<DentAidRoutes />} />
          {user.role === "ADMIN_ROLE" && (
            <Route path="/auth/register/" element={<RegisterPage />} />
          )}
          <Route path="/*" element={<Navigate to={"/dentaid/dashboard"} />} />
        </>
      ) : (
        <>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route path="/*" element={<Navigate to={"/auth/login"} />} />
        </>
      )}
    </Routes>
  );
};
