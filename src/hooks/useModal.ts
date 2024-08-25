import { useRef, useEffect } from "react";
import useOpen from "./useOpen";

const usePopup = <T extends HTMLElement>(initialState = false) => {
  const { close, isOpen, open, toggleOpen } = useOpen(initialState);
  const popupRef = useRef<T>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        isOpen &&
        popupRef.current &&
        !popupRef.current.contains(e.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, close]);

  return {
    isOpen,
    openPopup: open,
    closePopup: close,
    togglePopup: toggleOpen,
    popupRef,
  };
};

export default usePopup;
