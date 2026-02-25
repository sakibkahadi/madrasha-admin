"use client";

import Image from "next/image";

const { Button } = require("../ui/button");

const PrimaryButton = ({
  buttonText,
  icon,
  onClick,
  width = "w-[155px]", height = "h-[53px]",
  type = "button",
  variant = "primary", // future-proof
  disabled=false
}) => {
  const variantClasses = {
    primary:
      " rounded-[4px] disabled:bg-[#5792B9] px-3 bg-[#4BBAB1] text-[16px] leading-[34px] font-medium text-[#EAF1F6] hover:bg-[#232931] active:bg-[#3A9691]",
    secondary:
      " rounded-[4px] disabled:bg-[#5792B9] px-3 bg-[#4BBAB1] text-[16px] leading-[34px] font-medium text-[#EAF1F6] hover:text-[#4BBAB1] hover:bg-[#ffffff] active:bg-[#3A9691] active:text-[#ffffff]",
  };

  return (
    <Button
      onClick={onClick} disabled={disabled}
      type={type}
      className={`${variantClasses[variant] || variantClasses.primary} ${width} ${height}`}
    >
      {buttonText}
      <span className="ml-2">
          {icon}
        </span>
    </Button>
  );
};

export default PrimaryButton;