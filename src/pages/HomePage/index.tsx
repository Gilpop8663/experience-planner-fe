import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isSignupSuccess = searchParams.get("signup") === "success";

  useEffect(() => {
    if (isSignupSuccess) {
      toast.success("계정이 성공적으로 생성되었습니다!");
    }
  }, [isSignupSuccess]);

  return (
    <div>
      {/* 토스트 컨테이너를 화면 가운데 아래에 배치 */}
      <ToastContainer
        position="bottom-center" // 가운데 아래 위치
        autoClose={3000} // 3초 후 자동 닫힘
        hideProgressBar={false} // 진행 바 표시 여부
        newestOnTop={false} // 최신 알림이 위에 표시될지 여부
        closeOnClick // 클릭 시 알림 닫기
        rtl={false} // 오른쪽에서 왼쪽으로 텍스트 방향
        pauseOnFocusLoss // 포커스를 잃었을 때 알림 일시 중지
        draggable // 드래그 가능 여부
        pauseOnHover // 마우스 호버 시 알림 일시 중지
      />
      {/* 나머지 홈 화면 내용 */}
    </div>
  );
};

export default HomePage;
