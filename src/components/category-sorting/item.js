import React, { useState } from "react";
import { Transition } from "react-transition-group";
import { useCategories } from "../../hooks/use-categorysorting";

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

  return (
    <div
      className="flex items-center  transition-all mb-3 cursor-pointer select-none"
      onClick={() => {
        setActive(!active);
        if (!active) {
          setActiveCategories({ ...activeCategories, [item.type]: true });
        } else {
          setActiveCategories({ ...activeCategories, [item.type]: false });
        }
      }}
      style={active ? { opacity: 1 } : { opacity: 0.5 }}
    >
      <img
        src={`/images/icons/categories/${item.icon}`}
        className="transition-all"
      />

      <Transition in={categoriesHovered} timeout={duration}>
        {(state) => (
          <p
            className="text-sm w-40 font-medium ml-2 select-none"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            {item.title}
          </p>
        )}
      </Transition>
    </div>
  );
}
