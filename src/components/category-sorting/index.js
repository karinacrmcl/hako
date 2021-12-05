import { useEffect, useState } from "react";
import Item from "./item";
import Hint from "./hint";
import { useMediaQuery } from "react-responsive";

export default function Sorting({ isOnTop }) {
  const categories = [
    {
      title: "Hot / Trending",
      type: "hot",
      icon: "hot.svg",
      id: "1",
    },
    {
      title: "Latest News",
      type: "news",
      icon: "news.svg",
      id: "2",
    },
    {
      title: "Photography ",
      type: "photography",
      icon: "photo.svg",
      id: "3",
    },
    {
      title: "Posts & Articles",
      type: "article",
      icon: "post.svg",
      id: "4",
    },
    {
      title: "Books recomendations",
      type: "book",
      icon: "book.svg",
      id: "5",
    },
    {
      title: "Discussions",
      type: "discussion",
      icon: "discussion.svg",
      id: "6",
    },
  ];

  const [categoriesHovered, setCategoriesHovered] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "650px" });

  const [offset, setOffset] = useState(null);

  // window.onwheel = (e) => {
  //   if (onTimeline) {
  //     if (e.deltaY < 0) {
  //       setOffset("up");
  //       console.log(offset);
  //     } else if (e.deltaY > 0) {
  //       setOffset("down");
  //       console.log(offset);
  //     }
  //   } else {
  //     return;
  //   }
  // };

  // console.log(onTimeline);
  // console.log(offset);

  return (
    <div
      className={`flex flex-col items-center font-fontbasic z-60 relative ${
        isOnTop ? "slide-in-top " : "slide-out-top  "
      } `}
    >
      <div
        className={`flex flex-col overflow-hidden transition-all duration-400 ease-in-out bg-white items-center shadow-xl rounded-lg p-3 lptpXS:p-2 mobileXL:shadow-none mobileXL:w-3/4 mobileXL:p-1 mobileXL:h-10 mobileXL:flex-row mobileXL:items-center   ${
          categoriesHovered ? "w-56" : "w-16 lptpXS:w-12 "
        } ${offset == "up" ? "h-10" : "opacitty-0"}`}
        onMouseEnter={() => {
          if (isMobile) {
            return;
          } else {
            setCategoriesHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (isMobile) {
            return;
          } else {
            setCategoriesHovered(false);
          }
        }}
      >
        <h3 className="text-sm font-semibold mb-2 lptpXS:text-xs">
          {isMobile ? null : "SORT"}
        </h3>
        <div className="flex self-start flex-col mobileXL:flex-row  mobileXL:items-center mobileXL:h-full  ">
          {categories.map((item, i) => (
            <Item
              item={item}
              categoriesHovered={categoriesHovered}
              key={item.id}
              i={i}
            />
          ))}
        </div>
      </div>
      {isMobile ? null : <Hint />}
    </div>
  );
}
