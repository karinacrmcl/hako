import React from "react";
import { Transition } from "react-transition-group";
import { useState } from "react";
import { useModal } from "../../hooks/use-modal";
import { useMediaQuery } from "react-responsive";

export default function Categories({ btnActive }) {
  const isMobile = useMediaQuery({ maxWidth: "1024px" });

  const categories = [
    {
      title: "news",
      svgUrl: "/images/icons/menu/category-news.svg",
      position: "-left-10 top-0",
      id: 1,
      animDuration: 100,
      expl: "News Post",
      key: "modalAddNews",
    },
    {
      title: "photography",
      svgUrl: "/images/icons/menu/category-photo.svg",
      position: "-left-6 -top-7",
      id: 2,
      animDuration: 200,
      expl: "Photography",
      key: "modalAddPhoto",
    },
    {
      title: "article",
      svgUrl: "/images/icons/menu/category-article.svg",
      position: "-top-10 left-2.5",
      id: 3,
      animDuration: 300,
      expl: "Article",
      key: "modalAddArticle",
    },
    {
      title: "book",
      svgUrl: "/images/icons/menu/category-book.svg",
      position: "-right-3 -top-7",
      id: 4,
      animDuration: 400,
      expl: "Book",
      key: "modalAddBook",
    },
    {
      title: "discussion",
      svgUrl: "/images/icons/menu/category-discussion.svg",
      position: "-right-8 top-0",
      id: 5,
      animDuration: 500,
      expl: "Discussion",
      key: "modalAddDiscussion",
    },
  ];

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
  const [isHovered, setIsHovered] = useState(false);
  const [itemHovered, setItemHovered] = useState("");

  return (
    <div className="flex flex-col items-center">
      {isMobile
        ? null
        : categories.map((item) => {
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
                      setIsHovered(true);
                      setItemHovered(item.expl);
                    }}
                    onMouseLeave={() => {
                      setIsHovered(false);
                      setItemHovered("");
                    }}
                  >
                    <img
                      className="w-full "
                      src={item.svgUrl}
                      alt={item.title}
                    />
                  </div>
                )}
              </Transition>
            );
          })}
      <Transition in={isHovered} timeout={itemAnimDuration}>
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
