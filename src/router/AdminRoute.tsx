import { Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import { PropsWithChildren } from "react";
import { useMyProfile } from "@/hooks/query/user/useMyProfile";

export default function AdminRoute({ children }: PropsWithChildren) {
  const { user } = useMyProfile();

  if (user.role !== "ADMIN") {
    return <Navigate replace to={ROUTES.HOME} />;
  }

  return children;
}
