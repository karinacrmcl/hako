import React from "react";

export default function SvgSelector({ id }) {
  switch (id) {
    case "edit":
      return (
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute "
        >
          <path
            d="M16.8724 5.70523L24.2025 13.0354L8.28541 28.9525L1.75001 29.6739C0.875107 29.7707 0.135909 29.0309 0.233247 28.156L0.960421 21.616L16.8724 5.70523ZM28.7362 4.6139L25.2944 1.17213C24.2208 0.0985474 22.4796 0.0985474 21.406 1.17213L18.1681 4.41006L25.4983 11.7402L28.7362 8.50227C29.8098 7.42812 29.8098 5.68748 28.7362 4.6139Z"
            fill="white"
          />
        </svg>
      );
    case "edit-mobile":
      return (
        <svg
          width="8"
          height="13"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2"
        >
          <path
            d="M8.96289 7.44243L2.46074 1.05672C2.14725 0.748835 1.63873 0.748835 1.32524 1.05672L0.566798 1.80162C0.253651 2.10917 0.253317 2.60731 0.56546 2.91552L5.71867 8.00004L0.565794 13.0849C0.253317 13.3931 0.253985 13.8912 0.567133 14.1988L1.32558 14.9437C1.63906 15.2516 2.14759 15.2516 2.46107 14.9437L8.96289 8.55765C9.27637 8.24976 9.27637 7.75031 8.96289 7.44243Z"
            fill="#ffff"
          />
        </svg>
      );
    case "mobile-arrow":
      return (
        <svg
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.96289 7.44243L2.46074 1.05672C2.14725 0.748835 1.63873 0.748835 1.32524 1.05672L0.566798 1.80162C0.253651 2.10917 0.253317 2.60731 0.56546 2.91552L5.71867 8.00004L0.565794 13.0849C0.253317 13.3931 0.253985 13.8912 0.567133 14.1988L1.32558 14.9437C1.63906 15.2516 2.14759 15.2516 2.46107 14.9437L8.96289 8.55765C9.27637 8.24976 9.27637 7.75031 8.96289 7.44243Z"
            fill="#262626"
          />
        </svg>
      );
    case "close":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.99976 2.00098L15.9998 16.001"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M2.02856 16.0286L16.0133 2.01332"
            stroke="black"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return null;
  }
}
