import React from "react";

export default function SvgSelector({ id }) {
  switch (id) {
    case "bar":
      return (
        <svg
          width="18"
          height="14"
          viewBox="0 0 13 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1H12"
            stroke="#B8B8B8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M1 5H12"
            stroke="#B8B8B8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M1 9H12"
            stroke="#B8B8B8"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "plus-mobile":
      return (
        <svg
          width="18"
          height="18"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
        >
          <rect x="6" width="2" height="14" rx="1" fill="#B4B4B4" />
          <rect
            x="14"
            y="6"
            width="2"
            height="14"
            rx="1"
            transform="rotate(90 14 6)"
            fill="#B4B4B4"
          />
        </svg>
      );
    case "file":
      return (
        <svg
          width="16"
          height="21"
          viewBox="0 0 16 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 left-1/2 transform -translate-y-1/4 -translate-x-2/3"
        >
          <path
            d="M9.33333 5.57812V0H1C0.445833 0 0 0.438867 0 0.984375V20.0156C0 20.5611 0.445833 21 1 21H15C15.5542 21 16 20.5611 16 20.0156V6.5625H10.3333C9.78333 6.5625 9.33333 6.11953 9.33333 5.57812ZM12.0492 14.4379H9.33333V17.7192C9.33333 18.0817 9.035 18.3754 8.66667 18.3754H7.33333C6.965 18.3754 6.66667 18.0817 6.66667 17.7192V14.4379H3.95083C3.35583 14.4379 3.05875 13.7287 3.48125 13.3157L7.49875 9.39053C7.77583 9.11941 8.22333 9.11941 8.50042 9.39053L12.5179 13.3157C12.9408 13.7287 12.6442 14.4379 12.0492 14.4379ZM15.7083 4.30664L11.6292 0.287109C11.4417 0.102539 11.1875 0 10.9208 0H10.6667V5.25H16V4.9998C16 4.74141 15.8958 4.49121 15.7083 4.30664Z"
            fill="#9A86B5"
          />
        </svg>
      );

    case "cancel":
      return (
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L9 9"
            stroke="#9A86B5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M1 9L9 1"
            stroke="#9A86B5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case "file-large":
      return (
        <svg
          width="25"
          height="33"
          viewBox="0 0 25 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.1923 7.12272L24.1925 7.1229C24.3646 7.2933 24.4698 7.51583 24.4944 7.75H17.1667V0.504767C17.4152 0.527904 17.645 0.634447 17.8188 0.806497L24.1923 7.12272ZM1.5625 0.5H14.0833V8.76562C14.0833 9.89727 15.0151 10.8125 16.1458 10.8125H24.5V31.4531C24.5 32.0295 24.032 32.5 23.4375 32.5H1.5625C0.968008 32.5 0.5 32.0295 0.5 31.4531V1.54687C0.5 0.970517 0.968007 0.5 1.5625 0.5Z"
            stroke="#9A86B5"
          />
        </svg>
      );
    case "cancel-white":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 8 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="6.42383"
            width="1.14286"
            height="8"
            rx="0.571429"
            transform="rotate(45 6.42383 0)"
            fill="white"
          />
          <rect
            x="7.46484"
            y="5.65686"
            width="1.14286"
            height="8"
            rx="0.571429"
            transform="rotate(135 7.46484 5.65686)"
            fill="white"
          />
        </svg>
      );

    case "plus-white":
      return (
        <svg
          width="12"
          height="12"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="6" y="1" width="2" height="12" rx="1" fill="#ffff" />
          <rect
            x="14"
            y="7"
            width="2"
            height="12"
            rx="1"
            transform="rotate(90 14 6)"
            fill="#ffff"
          />
        </svg>
      );

    case "cancel-grey":
      return (
        <svg
          width="10"
          height="10"
          viewBox="0 0 8 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L4 4M7 7L4 4M4 4L7 1M4 4L1 7"
            stroke="#4D4C4C"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );

    case "gallery-mobile":
      return (
        <svg
          width="60"
          height="53"
          viewBox="0 0 60 53"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 43.0625V44.7188C50 47.4629 47.7615 49.6875 45 49.6875H5C2.23854 49.6875 0 47.4629 0 44.7188V18.2188C0 15.4746 2.23854 13.25 5 13.25H6.66667V34.7812C6.66667 39.3475 10.405 43.0625 15 43.0625H50ZM60 34.7812V8.28125C60 5.53705 57.7615 3.3125 55 3.3125H15C12.2385 3.3125 10 5.53705 10 8.28125V34.7812C10 37.5254 12.2385 39.75 15 39.75H55C57.7615 39.75 60 37.5254 60 34.7812ZM26.6667 13.25C26.6667 15.9942 24.4281 18.2188 21.6667 18.2188C18.9052 18.2188 16.6667 15.9942 16.6667 13.25C16.6667 10.5058 18.9052 8.28125 21.6667 8.28125C24.4281 8.28125 26.6667 10.5058 26.6667 13.25ZM16.6667 28.1562L22.4495 22.4096C22.9376 21.9245 23.7291 21.9245 24.2173 22.4096L28.3333 26.5L42.4495 12.4721C42.9376 11.987 43.7291 11.987 44.2173 12.4721L53.3333 21.5312V33.125H16.6667V28.1562Z"
            fill="#B4B4B4"
          />
        </svg>
      );

    default:
      return <p></p>;
      break;
  }
}
