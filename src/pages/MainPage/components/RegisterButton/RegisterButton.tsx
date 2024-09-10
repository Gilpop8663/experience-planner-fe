import { ROUTES } from "@/router/routes";
import { Link } from "react-router-dom";

export default function RegisterButton() {
  return (
    <Link to={ROUTES.REGISTER}>
      <div className="flex hover:bg-black/90 transition-all bg-[#525252] text-white rounded-full py-4 justify-center shadow-lg text-2xl w-64">
        <span>+ 일정 추가하기</span>
      </div>
    </Link>
  );
}
