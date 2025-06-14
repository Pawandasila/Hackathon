import React from "react";

interface ButtonCustomProps {
  value: string;
  icon?: React.ReactNode;
}

const ButtonCustom = ({ value , icon }: ButtonCustomProps) => {
  return (
    <button className={`group relative inline-flex h-10 sm:h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r dark:from-[#57a557] dark:to-[#26813a] from-[#f6f7ff] to-[#f5f6ff] dark:border-[rgb(117,168,120)] border-2 border-[#263381] bg-transparent font-medium dark:text-white text-black transition-all duration-100 dark:[box-shadow:5px_5px_rgb(76_100_255)] [box-shadow:5px_5px_rgb(38_51_129)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(38_51_129)] dark:active:[box-shadow:0px_0px_rgb(76_100_255)] text-sm sm:text-base ${icon ? 'pl-10 sm:pl-12 pr-4 sm:pr-6' : 'px-4 sm:px-6'}`}>
      {icon && (
        <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6">
          {icon}
        </span>
      )}
      <span className="relative">
        {value}
      </span>
    </button>
  );
};

export default ButtonCustom;
