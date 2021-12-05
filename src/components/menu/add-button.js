import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useModal } from "../../hooks/use-modal";
import CategoriesMobile from "./categories-mobile";
import Categories from "./category";

export default function AddButton() {
  const { openModal, setOpenModal } = useModal();
  const [btnHovered, setBtnHovered] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1024px" });

  return (
    <div className="relative w-36 h-full -mt-6 select-none lptpXS:w-20 mobileXL:w-12 ">
      <div
        onClick={() => {
          isMobile
            ? setOpenModal({ ...openModal, categoriesMobile: true })
            : setBtnHovered(!btnHovered);
        }}
        className="focus:bg-default-darkf w-12 h-12 bg-default-first rounded-full border border-btn border-white flex items-center justify-center cursor-pointer hover:bg-default-darkf transition-all duration-75 mobileXL:w-10 mobileXL:h-10"
      >
        {btnHovered ? (
          isMobile ? (
            <svg
              className="transition-all duration-200"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="6" width="2" height="14" rx="1" fill="white" />
              <rect
                x="14"
                y="6"
                width="2"
                height="14"
                rx="1"
                transform="rotate(90 14 6)"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              className="transition-all duration-200"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="12.1868"
                y="2.30151"
                width="2"
                height="14"
                rx="1"
                transform="rotate(44.4351 12.1868 2.30151)"
                fill="white"
              />
              <rect
                x="13.6985"
                y="12.1868"
                width="2"
                height="14"
                rx="1"
                transform="rotate(134.435 13.6985 12.1868)"
                fill="white"
              />
            </svg>
          )
        ) : (
          <svg
            className="transition-all duration-200"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="6" width="2" height="14" rx="1" fill="white" />
            <rect
              x="14"
              y="6"
              width="2"
              height="14"
              rx="1"
              transform="rotate(90 14 6)"
              fill="white"
            />
          </svg>
        )}
      </div>
      <Categories btnActive={btnHovered} />
    </div>
  );
}
