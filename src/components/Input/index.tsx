import React, { InputHTMLAttributes } from "react";

// Input 컴포넌트에 전달될 props의 타입 정의
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// Input 컴포넌트 정의
const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
      {...props}
    />
  );
};

export { Input };
