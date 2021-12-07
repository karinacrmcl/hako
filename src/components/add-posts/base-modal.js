import React from "react";
import ButtonFirst from "../../shared/button-1";
import ButtonSecond from "../../shared/button-2";
import { useModal } from "../../hooks/use-modal";
import { useMediaQuery } from "react-responsive";

export default function Base({ category, content, categoryKey }) {
  const { openModal, setOpenModal } = useModal();

  const isMobile = useMediaQuery({ maxWidth: "971px" });

  return isMobile ? (
    <div className="font-fontbasic z-100 fixed w-screen h-screen top-0 flex justify-center items-center tabletXL:bg-bgMobile slide-in-bottom ">
      <div className="bg-white shadow-xl p-8 rounded-lg relative flex flex-col desktopXS:w-1/2 desktopXS:h-5/6 lptpXS:w-full lptpXS:p-3 lptpXS:h-full mt-36 overflow-y-scroll overflow-x-hidden">
        <div className="flex justify-between ">
          <div
            className=""
            onClick={() => {
              setOpenModal({ ...openModal, [categoryKey]: false });
            }}
          >
            <ButtonFirst />
          </div>

          <h1 className="text-2xl font-semibold select-none lptpXL:text-xl text-lg mobileXL:text-base">
            Create new post
          </h1>
          <p className="w-5"></p>
        </div>

        <div className="flex w-full justify-center">
          <h2 className="select-none text-xs mobileXL:text-xxs">
            Category:
            <span className="text-xs font-medium mobileXL:text-xxs">
              {category}
            </span>
          </h2>
        </div>

        <div className="h-5/6 flex flex-col justify-center ">{content}</div>
        <div className="flex self-end"></div>
      </div>
    </div>
  ) : (
    <div className="font-fontbasic z-100 fixed w-screen h-screen top-0 bg-modal flex justify-center items-center tabletXL:bg-transparent">
      <div className="bg-white shadow-xl h-postAddBase w-postAddBase p-8 rounded-lg relative flex flex-col desktopXS:w-1/2 desktopXS:h-5/6 lptpXS:w-full lptpXS:p-3 lptpXS:overflow-hidden lptpXS:h-full tabletXL:overflow-scroll">
        <h1 className="text-2xl font-semibold select-none lptpXL:text-xl  tabletXL:text-lg">
          Create new post
        </h1>
        <h2 className="select-none lptpXL:text-sm ">
          Category:
          <span className="text-base font-medium lptpXL:text-sm ">
            {category}
          </span>
        </h2>
        <div className="h-5/6 flex flex-col justify-center ">{content}</div>
        <div className="flex self-end">
          <div
            className="mr-20"
            onClick={() => {
              setOpenModal({ ...openModal, [categoryKey]: false });
            }}
          >
            <ButtonFirst />
          </div>
        </div>
      </div>
    </div>
  );
}
