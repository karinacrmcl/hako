import SvgSelector from "../svg-selector";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "react-responsive";

export const MediaFieldFilled = ({ type, title, size, link, func }) => {
  const isMobileSM = useMediaQuery({ maxWidth: "450px" });

  return (
    <>
      {isMobileSM ? (
        <div className="w-20 h-20 ml-2 relative mt-2">
          <button
            className="bg-white p-1 absolute -right-2 -top-2 rounded-full border border-default-first"
            onClick={(e) => {
              func(e);
            }}
          >
            <SvgSelector id="cancel" />
          </button>
          {link ? (
            <img src={link} className="w-20 h-20 rounded-lg object-cover" />
          ) : (
            <Skeleton width={80} height={80} />
          )}
        </div>
      ) : (
        <div className="border border-default-first w-uploadSmall h-uploadSmall flex items-center rounded-lg p-3 mt-2 mr-4 select-none relative lptpXL:h-16 lptpXL:w-40 ">
          <button
            className="bg-white p-1 absolute -right-2 -top-2 rounded-full border border-default-first"
            onClick={(e) => {
              func(e);
            }}
          >
            <SvgSelector id="cancel" />
          </button>
          <div className="relative">
            <SvgSelector id="file-large" />
            <p className="absolute text-xxs font-bold text-default-first bottom-0.5 left-1/2 transform -translate-x-1/2 ">
              {type}
            </p>
          </div>
          <div className="flex flex-col ml-2 ">
            <p className="text-xs text-primary font-medium">{title}</p>
            <span className="text-xxs text-default-first ">{size}</span>
          </div>
        </div>
      )}
    </>
  );
};
