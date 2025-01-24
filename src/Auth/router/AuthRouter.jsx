import { Route, Routes } from "react-router";
import { LoginPage } from "../pages/Login";
import RegisterPage from "../pages/Register";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Routes>
  );
};
