import React from "react";

export default function SvgSelector({ id }) {
  switch (id) {
    case "user-add":
      return (
        <svg
          width="24"
          height="21"
          viewBox="0 0 24 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="lptpXS:w-5 lptpXS:-mb-1"
        >
          <rect width="24" height="21" fill="white" />
          <path
            d="M21 6V10"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M19 8H23"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="11.5" cy="5.5" r="4.5" stroke="black" strokeWidth="2" />
          <path
            d="M11.5 10C6.5905 10 2.55081 13.7242 2.05184 18.5016C1.99447 19.0509 2.44772 19.5 3 19.5H19.5C20.0523 19.5 20.505 19.0511 20.4541 18.5012C20.0112 13.724 16.4094 10 11.5 10Z"
            stroke="black"
            strokeWidth="2"
          />
        </svg>
      );

    default:
      return <p></p>;
      break;
  }
}
