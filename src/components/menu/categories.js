import React from "react";
import { Transition } from "react-transition-group";
import SvgSelector from "./svg-selector";

import { useState } from "react";
import { useModal } from "../../hooks/use-modal";
import { useMediaQuery } from "react-responsive";
import { addCategories } from "../../constants/categories";

export default function Categories({ btnActive }) {
  const isMobile = useMediaQuery({ maxWidth: "1024px" });

  const itemAnimDuration = 200;

  function categoryStyle(duration) {
    return {
      transition: `opacity ${duration}ms ease-in-out, transform 0.2s`,
      opacity: 0,
    };
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0, pointerEvents: "none" },
    exited: { opacity: 0, pointerEvents: "none" },
  };

  const { openModal, setOpenModal } = useModal();
  const [itemHovered, setItemHovered] = useState("");

  return (
    <div className="flex flex-col items-center">
      {!isMobile &&
        addCategories.map((item) => {
          return (
            <Transition
              in={btnActive}
              key={item.id}
              timeout={item.animDuration}
            >
              {(state) => (
                <div
                  style={{
                    ...categoryStyle(item.animDuration),
                    ...transitionStyles[state],
                  }}
                  className={`absolute ${item.position} cursor-pointer transform w-6 hover:scale-125`}
                  onClick={() => {
                    setOpenModal({ ...openModal, [item.key]: true });
                  }}
                  onMouseEnter={() => {
                    setItemHovered(item.expl);
                  }}
                  onMouseLeave={() => {
                    setItemHovered("");
                  }}
                >
                  <SvgSelector id={item.svgUrl} />
                </div>
              )}
            </Transition>
          );
        })}
      <Transition in={itemHovered.length !== 0} timeout={itemAnimDuration}>
        {(state) => (
          <div
            style={{
              ...categoryStyle(itemAnimDuration),
              ...transitionStyles[state],
            }}
            className="absolute bg-white rounded-lg px-2 py-1 font-medium category-width"
          >
            {itemHovered}
          </div>
        )}
      </Transition>
    </div>
  );
}
