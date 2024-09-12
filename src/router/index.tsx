import { createBrowserRouter } from "react-router-dom";
import ExperienceRegistration from "@/pages/MyInfoPage";
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
import PrivateRoute from "./PrivateRoute";

interface RouterBase {
  path: string;
  element: React.ReactNode;
  withAuth: boolean;
}

const routerData: RouterBase[] = [
  {
    path: ROUTES.HOME,
    element: <MainPage />,
    withAuth: true,
  },
  {
    path: ROUTES.MAIN,
    element: <MainPage />,
    withAuth: true,
  },
  {
    path: ROUTES.MAIN2,
    element: <MainPage2 />,
    withAuth: true,
  },
  {
    path: ROUTES.DETAILS,
    element: <ExperienceDetailPage />,
    withAuth: true,
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterPage />,
    withAuth: true,
  },
  {
    path: ROUTES.EDIT_REGISTER,
    element: <RegisterPage />,
    withAuth: true,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUpPage />,
    withAuth: false,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
    withAuth: false,
  },
  {
    path: ROUTES.LANDING,
    element: <LandingPage />,
    withAuth: false,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
    withAuth: false,
  },
  {
    path: ROUTES.INFO,
    element: <ExperienceRegistration />,
    withAuth: true,
  },
  {
    path: ROUTES.HEALTH_CHECK,
    element: <HealthCheckPage />,
    withAuth: true,
  },
  {
    path: ROUTES.RESET_PASSWORD, // 토큰을 URL 파라미터로 전달
    element: <ResetPasswordPage />,
    withAuth: false,
  },
];

const formattedRouter = routerData.map((route) => {
  if (route.withAuth) {
    return {
      path: route.path,
      element: <PrivateRoute>{route.element}</PrivateRoute>,
    };
  }

  return {
    path: route.path,
    element: route.element,
  };
});

export const router = createBrowserRouter(formattedRouter);
