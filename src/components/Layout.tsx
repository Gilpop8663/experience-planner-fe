import { PropsWithChildren } from "react";
import Header from "./Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header />
      <div className="mt-20">{children}</div>
    </div>
  );
}
