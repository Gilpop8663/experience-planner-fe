import { Navigate } from "react-router-dom";
import { ROUTES } from "./routes";
import { PropsWithChildren } from "react";
import { client } from "@/main";
import { ME } from "@/gql/query/user";

export default function PrivateRoute({ children }: PropsWithChildren) {
  // const user = client.readQuery({ query: ME });
  const user = true;

  if (!user) {
    return <Navigate replace to={ROUTES.LANDING} />;
  }

  return children;
}
