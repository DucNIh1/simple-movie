import React from "react";

const Button = ({ onClick, className, children, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={` px-5 py-4 mt-auto text-2xl font-bold text-white capitalize rounded-lg bg-primary hover:bg-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
