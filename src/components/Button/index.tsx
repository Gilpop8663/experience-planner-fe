import React, { ButtonHTMLAttributes } from "react";

// Button 컴포넌트에 전달될 props의 타입 정의
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

// Button 컴포넌트 정의
const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm md:text-base lg:text-lg font-medium text-white 
      ${props.disabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
      ${className}`}
      {...props}
      disabled={props.disabled} // disabled 속성 전달
    >
      {children}
    </button>
  );
};

export { Button };
