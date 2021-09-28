import { useState } from "react";
import { useMediaQuery } from "react-responsive";

import Item from "./item";
import Hint from "./hint";
import { categoriesSorting } from "../../constants/categories";

export default function Sorting({ isOnTop }) {
  const [categoriesHovered, setCategoriesHovered] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "650px" });

  return (
    <div
      className={`flex flex-col items-center font-fontbasic z-60 relative mobileXL:w-80 ${
        isOnTop ? "slide-in-top " : "slide-out-top  "
      } `}
    >
      <div
        className={`flex flex-col mobileXL:justify-center overflow-hidden transition-all duration-400 ease-in-out bg-white items-center shadow-xl rounded-lg p-3 lptpXS:p-2 mobileXL:shadow-none mobileXL:w-3/4 mobileXL:p-1 mobileXL:h-10 mobileXL:flex-row mobileXL:items-center   ${
          categoriesHovered ? "w-56" : "w-16 lptpXS:w-12 "
        } `}
        onMouseEnter={() => {
          if (isMobile) {
            return;
          } else {
            setCategoriesHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (isMobile) {
            return;
          } else {
            setCategoriesHovered(false);
          }
        }}
      >
        <h3 className="text-sm font-semibold mb-2 lptpXS:text-xs">
          {isMobile ? null : "SORT"}
        </h3>
        <div className="flex self-start flex-col mobileXL:flex-row  mobileXL:items-center mobileXL:h-full  ">
          {categoriesSorting.map((item, i) => (
            <Item
              item={item}
              categoriesHovered={categoriesHovered}
              key={item.id}
              i={i}
            />
          ))}
        </div>
      </div>
      {isMobile ? null : <Hint />}
    </div>
  );
}
