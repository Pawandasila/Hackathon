import React from "react";

interface ButtonCustomProps {
  value: string;
}

const ButtonCustom = ({ value }: ButtonCustomProps) => {
  return (
    <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md   bg-gradient-to-r dark:from-[#57a557] dark:to-[#26813a] from-[#f6f7ff] to-[#f5f6ff] dark:border-[rgb(117,168,120)] border-2 border-[#263381] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 dark:[box-shadow:5px_5px_rgb(76_100_255)] [box-shadow:5px_5px_rgb(38_51_129)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(38_51_129)] dark:active:[box-shadow:0px_0px_rgb(76_100_255)]">
      {value}
    </button>
  );
};

export default ButtonCustom;
