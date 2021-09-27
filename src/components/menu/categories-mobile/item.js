import { Transition } from "react-transition-group";
import SvgSelector from "../svg-selector";

export const CategoryItem = ({ item, openModal, setOpenModal }) => {
  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0, pointerEvents: "none" },
    exited: { opacity: 0, pointerEvents: "none" },
  };
  function categoryStyle(duration) {
    return {
      transition: `opacity ${duration}ms ease-in-out, transform 0.2s`,
      opacity: 0,
    };
  }
  return (
    <Transition
      in={openModal.categoriesMobile}
      key={item.id}
      timeout={item.animDuration}
    >
      {(state) => (
        <div
          style={{
            ...categoryStyle(item.animDuration),
            ...transitionStyles[state],
          }}
          onClick={() => {
            setOpenModal({
              ...openModal,
              [item.modalKey]: true,
              categoriesMobile: false,
            });
          }}
          className="w-full shadow-category flex justify-between p-2 items-center mb-3 rounded-lg cursor-pointer"
        >
          <div className="flex">
            <SvgSelector id={item.icon} />
            <p className="text-xs font-semibold ml-2">{item.title}</p>
          </div>
          <SvgSelector id="plus-mobile" />
        </div>
      )}
    </Transition>
  );
};
