import { Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import { PropsWithChildren } from "react";
import { ACCESS_TOKEN } from "@/constants/localStorage";

export default function MainRedirect({ children }: PropsWithChildren) {
  const user = localStorage.getItem(ACCESS_TOKEN);

  if (user) {
    return <Navigate replace to={ROUTES.MAIN} />;
  }

  return children;
}
