import React, { useState } from "react";

export default function Hint() {
  const [hintHovered, setHintHovered] = useState(false);

  return (
    <div className="relative self-start ml-1.5">
      <div
        className="rounded-full bg-gray-inactive w-11 h-11 flex justify-center items-center mt-5 hover:bg-gray-inputborder cursor-pointer self-start  "
        onMouseEnter={() => setHintHovered(true)}
        onMouseLeave={() => setHintHovered(false)}
      >
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.31317 0C3.81883 0 2.20323 1.02197 0.934826 2.84456C0.704732 3.17519 0.77567 3.6285 1.09664 3.87188L2.4447 4.89403C2.76886 5.13981 3.23008 5.08234 3.48386 4.76441C4.26664 3.78375 4.8473 3.21913 6.07001 3.21913C7.03139 3.21913 8.22051 3.83784 8.22051 4.77009C8.22051 5.47484 7.63873 5.83678 6.68948 6.36897C5.58251 6.98959 4.11764 7.76197 4.11764 9.69413V10C4.11764 10.4142 4.45342 10.75 4.86764 10.75H7.13236C7.54658 10.75 7.88236 10.4142 7.88236 10V9.81959C7.88236 8.48022 11.797 8.42444 11.797 4.8C11.797 2.0705 8.9657 0 6.31317 0ZM6.00001 11.6706C4.80639 11.6706 3.83529 12.6417 3.83529 13.8353C3.83529 15.0289 4.80639 16 6.00001 16C7.19364 16 8.16473 15.0289 8.16473 13.8353C8.16473 12.6417 7.19364 11.6706 6.00001 11.6706Z"
            fill="#858585"
          />
        </svg>
      </div>
      <div
        className={`absolute left-14 top-4 rounded-lg bg-gray-hint w-52 h-14 leading-4 p-1 opacity-${
          hintHovered ? "100" : "0"
        } transition-all`}
      >
        <p className="text-sm leading-4 text-black-hintp">
          You can choose the categories that interest you.
        </p>
        <span className="text-xs text-black-hints italic">
          (Click on category icon)
        </span>
      </div>
    </div>
  );
}
