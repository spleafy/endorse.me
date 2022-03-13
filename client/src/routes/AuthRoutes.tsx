import { Routes, Route, Navigate } from "react-router-dom";
// Pages
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPage from "../pages/ForgotPage";
import ResetPage from "../pages/ResetPage";
// Components

const AuthRoutes = () => {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={"login"} />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot" element={<ForgotPage />} />
          <Route path="reset" element={<ResetPage />} />
        </Routes>
      </main>
    </>
  );
};

export default AuthRoutes;
