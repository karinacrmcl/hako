import React, { useState } from "react";

import { useMediaQuery } from "react-responsive";
import { useModal } from "../../../hooks/use-modal";

import SvgSelector from "../svg-selector";
import Categories from "../categories";

export default function AddButton() {
  const { openModal, setOpenModal } = useModal();
  const [btnHovered, setBtnHovered] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "1024px" });

  return (
    <div className="relative w-36 h-full -mt-6 select-none lptpXS:w-14 mobileXL:w-12 ">
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
            <SvgSelector id="plus" />
          ) : (
            <SvgSelector id="close" />
          )
        ) : (
          <SvgSelector id="plus" />
        )}
      </div>
      <Categories btnActive={btnHovered} />
    </div>
  );
}
