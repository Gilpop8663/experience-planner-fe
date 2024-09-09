import { createBrowserRouter } from "react-router-dom";
import ExperienceRegistration from "@/pages/MyInfoPage";
import HomePage from "@/pages/HomePage";
import MainPage from "@/pages/MainPage";
import ExperienceDetailPage from "@/pages/DetailPage";
import SignUpPage from "@/pages/SignUpPage";
import LoginPage from "@/pages/LoginPage";
import HealthCheckPage from "@/pages/HealthCheckPage";
import MainPage2 from "@/pages/MainPage2";
import LandingPage from "@/pages/LandingPage";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import { ROUTES } from "./routes";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import RegisterPage from "@/pages/RegisterPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <MainPage />,
  },
  {
    path: ROUTES.MAIN,
    element: <MainPage />,
  },
  {
    path: ROUTES.MAIN2,
    element: <MainPage2 />,
  },
  {
    path: ROUTES.DETAILS,
    element: <ExperienceDetailPage />,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUpPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTES.LANDING,
    element: <LandingPage />,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: ROUTES.INFO,
    element: <ExperienceRegistration />,
  },
  {
    path: ROUTES.HEALTH_CHECK,
    element: <HealthCheckPage />,
  },
  {
    path: ROUTES.RESET_PASSWORD, // 토큰을 URL 파라미터로 전달
    element: <ResetPasswordPage />,
  },
]);
