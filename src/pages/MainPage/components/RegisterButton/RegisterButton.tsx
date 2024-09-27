import { ROUTES } from "@/router/routes";
import { Link } from "react-router-dom";

export default function RegisterButton() {
  return (
    <Link to={ROUTES.REGISTER}>
      <div className="flex hover:bg-black/90 transition-all bg-[#525252] text-white rounded-full py-3 lg:py-4 justify-center shadow-lg text-base sm:text-lg md:text-xl lg:text-2xl w-40 sm:w-48 md:w-56 lg:w-64">
        <span>+ 일정 추가하기</span>
      </div>
    </Link>
  );
}
