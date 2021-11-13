import { Transition } from "react-transition-group";

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
          <img src="\images\icons\add-posts\success.svg" />
          <div className="flex flex-col ml-3">
            <h2 className="text-white font-bold text-xl uppercase leading-none	">
              Your publication was successfully added.
            </h2>
            <p className="text-white font-medium text-lg leading-none mt-2">
              To see the new post, check out your profile
            </p>
          </div>
        </div>
      )}
    </Transition>
  );
}
