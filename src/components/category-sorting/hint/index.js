import React, { useState } from "react";
import SvgSelector from "../svg-selector";

export default function Hint() {
  const [hintHovered, setHintHovered] = useState(false);

  return (
    <div className="relative self-start ml-1.5 z-100">
      <div
        className="rounded-full bg-gray-inactive w-11 h-11 z-10 flex justify-center items-center mt-5 hover:bg-gray-inputborder cursor-pointer self-start lptpXS:w-9 lptpXS:h-9 "
        onMouseEnter={() => setHintHovered(true)}
        onMouseLeave={() => setHintHovered(false)}
      >
        <SvgSelector id="question-mark" />
      </div>
      <div
        className={`absolute left-14 z-100 top-4 rounded-lg bg-gray-hint w-52 h-14 leading-4 p-1 opacity-${
          hintHovered ? "100" : "0"
        } transition-all`}
      >
        <p className="text-sm leading-4 text-black-hintp lptpXS:text-xs">
          You can choose the categories that interest you.
        </p>
        <span className="text-xs text-black-hints italic">
          (Click on category icon)
        </span>
      </div>
    </div>
  );
}
