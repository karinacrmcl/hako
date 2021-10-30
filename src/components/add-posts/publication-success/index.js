import { Transition } from "react-transition-group";
import SvgSelector from "../svg-selector";

export default function PublicationSuccess({ isPublished }) {
  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    zIndex: -1,
  };

  const transitionStyles = {
    entering: { opacity: 1, zIndex: 1 },
    entered: { opacity: 1, zIndex: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Transition in={isPublished} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          className="select-none absolute bg-gradient-to-r from-gradient-from to-gradient-to success-container rounded-lg flex items-center p-6 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2"
        >
          <SvgSelector id="success" className="lptpXL:w-20" />

          <div className="flex flex-col ml-3">
            <h2 className="text-white font-bold text-xl uppercase leading-none lptpXS:text-lg	mobileXL:text-base mobileXS:text-sm">
              Your publication was successfully added.
            </h2>
            <p className="text-white font-medium text-lg leading-none mt-2 lptpXS:text-base mobileXL:text-sm mobileXS:text-xs">
              To see the new post, check out your profile
            </p>
          </div>
        </div>
      )}
    </Transition>
  );
}
