import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const useRegister = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (id) {
      setActiveTab(1);
    }
  }, [id]);

  return {
    activeTab,
    setActiveTab,
  };
};
