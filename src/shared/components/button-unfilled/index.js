import React from "react";
import { useMediaQuery } from "react-responsive";

export default function ButtonUnfilled({ func }) {
  const isMobile = useMediaQuery({ maxWidth: "971px" });

  return (
    <button
      onClick={func}
      className=" p-1 px-4 text-xl font-semibold text-gradient-from rounded-lg border-btn border-default-first mr-4 transition-all hover:bg-default-first hover:text-white duration-500 lptpXL:text-base lptpXL:mr-0  tabletXL:border-transparent tabletXL:w-auto tabletXL:p-0 "
    >
      {isMobile ? (
        <img src="/images/icons/categories-mobile/cancel.png" />
      ) : (
        "Cancel"
      )}
    </button>
  );
}
