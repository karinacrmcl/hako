import SvgSelector from "../svg-selector";

export const MediaFieldEmpty = ({ func, isMobile }) => {
  return (
    <>
      {isMobile ? (
        <div className="relative cursor-pointer">
          <input
            className="cursor-pointer w-20 h-20 bg-gray-addContainer flex items-center rounded-lg cursor-pointer justify-center transition-all file-select mt-1 "
            type="file"
            onChange={(e) => func(e)}
          />
          <SvgSelector id="plus-mobile" />
        </div>
      ) : (
        <div className="relative cursor-pointer">
          <input
            className="cursor-pointer border border-dashed border-default-first w-uploadSmall h-uploadSmall flex items-center rounded-lg p-0.5 mt-2 mr-4 cursor-pointer justify-center transition-all opacity-80 hover:opacity-100 file-select lptpXL:h-16 lptpXL:w-40"
            type="file"
            onChange={(e) => func(e)}
          />
          <SvgSelector id="file" />
        </div>
      )}
    </>
  );
};
