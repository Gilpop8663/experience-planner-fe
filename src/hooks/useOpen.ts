import { useState } from "react";

const useOpen = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleOpen = () => {
    setIsOpen((prevState) => !prevState);
  };

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    toggleOpen,
    close,
    open,
  };
};

export default useOpen;
