import React from "react";
import useMediaQuery from "react-responsive";

export default function SvgSelector({ id }) {
  const isMobile = useMediaQuery({ maxWidth: "650px" });

  switch (id) {
    case "search":
      return (
        <svg
          width="19"
          height="21"
          viewBox="0 0 19 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex items-center justify-center ml-1 mobileXL:h-14 mobileXL:w-4.5"
        >
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke={`${isMobile ? "#CFCFCF" : "#E1E1E1"} `}
            strokeWidth="2"
          />
          <path
            d="M13 14L18 20"
            stroke={`${isMobile ? "#CFCFCF" : "#E1E1E1"} `}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case "search-hovered":
      return (
        <svg
          width="19"
          height="21"
          viewBox="0 0 19 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex items-center justify-center ml-1 mobileXL:h-14 mobileXL:w-4.5"
        >
          <path
            d="M13 14L18 20"
            stroke="url(#paint0_linear)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="url(#paint1_linear)"
            strokeWidth="2"
          />
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="15.5"
              y1="14"
              x2="15.5"
              y2="20"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#B7BBCE" />
              <stop offset="1" stopColor="#9A86B5" />
            </linearGradient>
            <linearGradient
              id="paint1_linear"
              x1="8"
              y1="0"
              x2="8"
              y2="16"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D3EEE6" />
              <stop offset="1" stopColor="#B7BBCE" />
            </linearGradient>
          </defs>
        </svg>
      );
    default:
      return <p></p>;
      break;
  }
}
