import React from "react";
import { Transition } from "react-transition-group";
import { addCategoriesMobile } from "../../../constants/categories";
import { useModal } from "../../../context/modal-context";
import SvgSelector from "../svg-selector";
import { CategoryItem } from "./item";

export default function CategoriesMobile() {
  const { openModal, setOpenModal } = useModal();

  return (
    <div className="font-fontbasic z-100 fixed w-screen h-screen top-0 bg-modal flex justify-center items-center">
      <div className="bg-white rounded-lg w-80 h-96 p-2.5">
        <div className="flex justify-between">
          <p className="font-semibold text-sm mr-2">
            What type of publication do you want to add?
          </p>
          <button
            className="flex justify-center"
            onClick={() => {
              setOpenModal({ ...openModal, categoriesMobile: false });
            }}
          >
            <SvgSelector id="cancel-mobile" />
          </button>
        </div>

        <div className="flex flex-col items-start mt-6">
          {addCategoriesMobile.map((item) => {
            return (
              <CategoryItem
                item={item}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
