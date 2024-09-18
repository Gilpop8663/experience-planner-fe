import { cn } from "@/lib/utils";
import React from "react";

const Skeleton: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
}) => {
  return (
    <div
      className={cn(
        `bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded`,
        className,
      )}
    />
  );
};

export default Skeleton;
