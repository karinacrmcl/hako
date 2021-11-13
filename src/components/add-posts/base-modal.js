import React from "react";
import ButtonFirst from "../../shared/button-1";
import ButtonSecond from "../../shared/button-2";
import { useModal } from "../../hooks/use-modal";

export default function Base({ category, content, categoryKey }) {
  const { openModal, setOpenModal } = useModal();

  return (
    <div className="font-fontbasic z-100 fixed w-screen h-screen top-0 bg-modal flex justify-center items-center">
      <div className="bg-white shadow-xl h-postAddBase w-postAddBase p-8 rounded-lg relative flex flex-col">
        <h1 className="text-2xl font-semibold select-none">Create new post</h1>
        <h2 className="select-none">
          Category: <span className="text-base font-medium">{category} </span>{" "}
        </h2>
        <div className="h-5/6 flex flex-col justify-center">{content}</div>
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
