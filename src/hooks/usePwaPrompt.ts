import { BeforeInstallPromptEvent } from "@/window";
import { useEffect, useState } from "react";

const isBeforeInstallPromptEvent = (
  e: Event,
): e is BeforeInstallPromptEvent => {
  return "platforms" in e && "userChoice" in e && "prompt" in e;
};

export const usePwaPrompt = () => {
  const isDeviceIOS = /iPad|iPhone|iPod/.test(window.navigator.userAgent);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const handleInstallClick = async () => {
    if (isDeviceIOS) {
      alert(
        "iOS 기기에서는 지원하지 않습니다. iOS 기기에서는 '사파리 브라우저 > 옵션 > 홈 화면 추가' 버튼을 통해 설치해주세요.",
      );
    }

    if (!deferredPrompt) return;

    const { outcome } = await deferredPrompt.prompt();

    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
  };

  const handleCancelClick = () => {
    setDeferredPrompt(null);
  };

  const handleBeforeInstallPrompt = (event: BeforeInstallPromptEvent) => {
    if (isBeforeInstallPromptEvent(event)) {
      event.preventDefault();
      setDeferredPrompt(event);
    }
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  return { handleCancelClick, handleInstallClick, deferredPrompt };
};
