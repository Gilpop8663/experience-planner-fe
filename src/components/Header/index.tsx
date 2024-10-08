import { useLogout } from "@/hooks/mutation/user/useLogout";
import { ROUTES } from "@/router/routes";
import { Link } from "react-router-dom";

export default function Header() {
  const { handleLogout } = useLogout();

  return (
    <div className="fixed top-0 bg-white w-full left-0 z-10">
      <div className="h-12 sm:h-14 md:h-16 lg:h-20 px-8 border-b flex justify-between items-center">
        <Link to={ROUTES.MAIN}>
          <span className="text-base sm:text-lg md:text-2xl lg:text-4xl">
            체험단 플래너
          </span>
        </Link>
        <div className="flex text-xs sm:text-sm md:text-base lg:text-xl gap-5">
          <Link
            to={ROUTES.INFO}
            className="hover:bg-black/10 p-2 rounded-md cursor-pointer"
          >
            내 정보
          </Link>
          <span
            onClick={handleLogout}
            className="hover:bg-black/10 p-2 rounded-md cursor-pointer"
          >
            로그아웃
          </span>
        </div>
      </div>
    </div>
  );
}
