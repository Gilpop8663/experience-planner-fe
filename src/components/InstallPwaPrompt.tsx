import { usePwaPrompt } from "@/hooks/usePwaPrompt";
import React from "react";

const InstallPwaPrompt: React.FC = () => {
  const { deferredPrompt, handleInstallClick, handleCancelClick } =
    usePwaPrompt();

  if (!deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-10 shadow-lg p-4 flex flex-col md:flex-row justify-between items-center">
      <span className="text-gray-700 text-center md:text-left mb-2 md:mb-0">
        <div>🎉 체험단 플래너! 모바일에서 더 편리하게 사용해보세요! </div>
        <strong>홈 화면에 추가하면 언제든지 쉽게 접근할 수 있습니다.</strong>
      </span>
      <div className="flex space-x-2">
        <button
          onClick={handleInstallClick}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          추가하기
        </button>
        <button
          onClick={handleCancelClick}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
        >
          나중에
        </button>
      </div>
    </div>
  );
};

export default InstallPwaPrompt;
