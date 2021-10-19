import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";
import SvgSelector from "../svg-selector";

export default function Pinned({ pinnedPublications, setIsOpen, isOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "375px" });

  return (
    <>
      {isMobile ? null : (
        <div className="bg-white flex items-center px-2.5 shadow-xl w-full h-12 rounded-lg mt-10 ml-20 relative lptpXS:mt-5 tabletXL:w-96 tabletXL:ml-0 mobileXL:w-full mobileXL:shadow-none mobileSM:mt-2 mobileSM:">
          <p className="font-medium lptpXS:text-sm">
            Pinned publications (
            {pinnedPublications ? (
              pinnedPublications.length
            ) : (
              <Skeleton width={10} height={10} />
            )}
            )
          </p>
          {isOpen ? (
            <button
              className="pinned-button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsOpen(false)}
            >
              <span
                className={` absolute duration-100 ${
                  isHovered ? "opacity-0 display-none" : "opacity-1"
                }`}
              >
                <SvgSelector id="close" />
              </span>
              <p
                className={`text-gray-extralight font-medium text-sm transition-all duration-300 lptpXS:text-xs  ${
                  isHovered ? "opacity-1" : "opacity-0 display-none"
                }`}
              >
                Close
              </p>
            </button>
          ) : (
            <button
              className="pinned-button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsOpen(true)}
            >
              <span
                className={` absolute duration-100 ${
                  isHovered ? "opacity-0 display-none" : "opacity-1"
                }`}
              >
                <SvgSelector id="pin" />
              </span>

              <p
                className={`text-gray-extralight font-medium text-sm transition-all duration-300 lptpXS:text-xs ${
                  isHovered ? "opacity-1" : "opacity-0 display-none"
                }`}
              >
                See
              </p>
            </button>
          )}
        </div>
      )}
    </>
  );
}
