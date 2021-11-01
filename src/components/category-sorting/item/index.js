import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Transition } from "react-transition-group";
import { useCategories } from "../../../context/categories-selected";
import SvgSelector from "../svg-selector";

export default function Item({ item, categoriesHovered }) {
  const duration = 250;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const [active, setActive] = useState(true);
  const { activeCategories, setActiveCategories } = useCategories();
  const isMobile = useMediaQuery({ maxWidth: "650px" });

  function handleActive() {
    setActive(!active);
    if (!active) {
      setActiveCategories({ ...activeCategories, [item.type]: true });
    } else {
      setActiveCategories({ ...activeCategories, [item.type]: false });
    }
  }

  return (
    <div
      className="flex items-center transition-all mb-3 cursor-pointer select-none lptpXS:mb-2 mobileXL:ml-1.5 mobileXL:mr-1.5 mobileXL:mb-0  "
      onClick={() => {
        handleActive();
      }}
      style={active ? { opacity: 1 } : { opacity: 0.5 }}
    >
      <SvgSelector id={item.icon} s />

      <Transition in={categoriesHovered} timeout={duration}>
        {(state) =>
          isMobile ? null : (
            <p
              className="text-sm w-40 font-medium ml-2 select-none lptpXS:text-xs"
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            >
              {item.title}
            </p>
          )
        }
      </Transition>
    </div>
  );
}
