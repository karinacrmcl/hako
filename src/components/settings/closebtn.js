import React from "react";
import { useModal } from "../../hooks/use-modal";

export default function CloseBtn() {
  const { openModal, setOpenModal } = useModal();
  return (
    <button
      className="absolute top-4 right-4"
      onClick={() => {
        setOpenModal({ ...openModal, ["modalSettings"]: false });
      }}
    >
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
    </button>
  );
}
