import { useState } from "react";
import Item from "./item";
import Hint from "./hint";

export default function Sorting() {
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

  return (
    <div className="flex flex-col items-center font-fontbasic fixed left-64 top-32 z-50">
      <div
        className={`flex flex-col  overflow-hidden transition-all duration-400 ease-in-out bg-white items-center shadow-xl rounded-lg p-3 ${
          categoriesHovered ? "w-56" : "w-16"
        }`}
        onMouseEnter={() => {
          setCategoriesHovered(true);
        }}
        onMouseLeave={() => {
          setCategoriesHovered(false);
        }}
      >
        <h3 className="text-sm font-semibold mb-2">SORT</h3>
        <div className="flex self-start flex-col">
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
      <Hint />
    </div>
  );
}
