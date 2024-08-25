import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Header() {
  return (
    <div className="fixed top-0 bg-brand w-full left-0 z-10">
      <div className="p-5">
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>
    </div>
  );
}
