import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";

export default function Pinned({ pinnedPublications, setIsOpen, isOpen }) {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "375px" });
  // const [pinned, setPinned] = useState([]);
  // const [isPinnedOpened, setIsPinnedOpened] = useState(false);

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
              <p
                className={`text-gray-extralight font-medium text-sm transition-all duration-300 lptpXS:text-xs  ${
                  isHovered ? "opacity-1" : "opacity-0 display-none"
                }`}
              >
                Close
              </p>

              <svg
                width="15"
                height="15"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={` absolute duration-100 ${
                  isHovered ? "opacity-0 display-none" : "opacity-1"
                }`}
              >
                <path
                  d="M1 1L4 4M7 7L4 4M4 4L7 1M4 4L1 7"
                  stroke="#DCDCDC"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          ) : (
            <button
              className="pinned-button"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsOpen(true)}
            >
              <p
                className={`text-gray-extralight font-medium text-sm transition-all duration-300 lptpXS:text-xs ${
                  isHovered ? "opacity-1" : "opacity-0 display-none"
                }`}
              >
                See
              </p>

              <svg
                width="19"
                height="21"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={` absolute duration-100 ${
                  isHovered ? "opacity-0 display-none" : "opacity-1"
                }`}
              >
                <path
                  d="M13.7274 11.7903L15.0364 7.4243L16.6321 8.01799C17.1333 8.20443 17.7005 7.97454 17.899 7.50449L18.618 5.80234C18.8166 5.33229 18.5713 4.80012 18.0702 4.61367L7.78673 0.7877C7.28561 0.601254 6.71842 0.83115 6.51986 1.30119L5.80084 3.00335C5.60229 3.47339 5.84757 4.00557 6.3487 4.19202L7.94441 4.7857L5.71026 8.80754C3.53853 8.92501 1.51631 9.83212 0.756263 11.6314C0.557709 12.1015 0.802988 12.6336 1.30412 12.8201L6.44584 14.7331L4.88786 18.4213C4.86925 18.4654 4.86183 18.5129 4.86621 18.5601L5.05455 20.5998C5.07763 20.8498 5.39591 20.9687 5.59561 20.8011L7.22199 19.4366C7.25962 19.405 7.28891 19.3656 7.30753 19.3216L8.86551 15.6333L14.0072 17.5463C14.5084 17.7327 15.0755 17.5028 15.2741 17.0328C16.0408 15.2178 15.2075 13.2566 13.7274 11.7903Z"
                  fill={`#DCDCDC`}
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
