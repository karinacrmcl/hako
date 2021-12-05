import React from "react";
import { Transition } from "react-transition-group";
import { useModal } from "../../hooks/use-modal";

export default function CategoriesMobile() {
  const categoriesList = [
    {
      title: "Post / Article",
      icon: "/images/icons/categories-mobile/article.svg",
      index: "1",
      modalKey: "modalAddArticle",
      animDuration: 100,
    },
    {
      title: "News post",
      icon: "/images/icons/categories-mobile/news.svg",
      index: "2",
      modalKey: "modalAddNews",
      animDuration: 200,
    },
    {
      title: "Photography",
      icon: "/images/icons/categories-mobile/photography.svg",
      index: "3",
      modalKey: "modalAddPhoto",
      animDuration: 300,
    },
    {
      title: "Book post",
      icon: "/images/icons/categories-mobile/book.svg",
      index: "4",
      modalKey: "modalAddBook",
      animDuration: 400,
    },
    {
      title: "Discussion",
      icon: "/images/icons/categories-mobile/discussion.svg",
      index: "5",
      modalKey: "modalAddDiscussion",
      animDuration: 500,
    },
  ];

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

  const CategoryItem = ({ item }) => {
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
              <img src={item.icon} alt={item.title} />
              <p className="text-xs font-semibold ml-2">{item.title}</p>
            </div>
            <svg
              width="13"
              height="13"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="6" width="2" height="14" rx="1" fill="#262626" />
              <rect
                x="14"
                y="6"
                width="2"
                height="14"
                rx="1"
                transform="rotate(90 14 6)"
                fill="#262626"
              />
            </svg>
          </div>
        )}
      </Transition>
    );
  };

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
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5 0.359375C17.6543 0.359375 22.6406 5.3457 22.6406 11.5C22.6406 17.6543 17.6543 22.6406 11.5 22.6406C5.3457 22.6406 0.359375 17.6543 0.359375 11.5C0.359375 5.3457 5.3457 0.359375 11.5 0.359375ZM11.5 20.4844C16.4639 20.4844 20.4844 16.4639 20.4844 11.5C20.4844 6.53613 16.4639 2.51562 11.5 2.51562C6.53613 2.51562 2.51562 6.53613 2.51562 11.5C2.51562 16.4639 6.53613 20.4844 11.5 20.4844ZM6.92695 8.70586L9.72109 11.5L6.92695 14.2941C6.71582 14.5053 6.71582 14.8467 6.92695 15.0578L7.94219 16.073C8.15332 16.2842 8.49473 16.2842 8.70586 16.073L11.5 13.2789L14.2941 16.073C14.5053 16.2842 14.8467 16.2842 15.0578 16.073L16.073 15.0578C16.2842 14.8467 16.2842 14.5053 16.073 14.2941L13.2789 11.5L16.073 8.70586C16.2842 8.49473 16.2842 8.15332 16.073 7.94219L15.0578 6.92695C14.8467 6.71582 14.5053 6.71582 14.2941 6.92695L11.5 9.72109L8.70586 6.92695C8.49473 6.71582 8.15332 6.71582 7.94219 6.92695L6.92695 7.94219C6.71582 8.15332 6.71582 8.49473 6.92695 8.70586V8.70586Z"
                fill="#262626"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-start mt-6">
          {categoriesList.map((item) => {
            return <CategoryItem item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
