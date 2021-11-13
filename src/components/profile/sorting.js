import React from "react";
import { useProfileCategories } from "../../hooks/use-profile-categories";

export default function Sorting() {
  const categoriesList = [
    {
      title: "photography",
      icon: "/images/icons/user/photo.svg",
      id: 1,
    },
    {
      title: "news",
      icon: "/images/icons/user/news.svg",
      id: 2,
    },
    {
      title: "article",
      icon: "/images/icons/user/article.svg",
      id: 3,
    },
    {
      title: "book",
      icon: "/images/icons/user/book.svg",
      id: 4,
    },
    {
      title: "discussion",
      icon: "/images/icons/user/discussion.svg",
      id: 5,
    },
  ];

  const { profileActiveCategories, setProfileActiveCategories } =
    useProfileCategories();

  return (
    <div className="bg-white flex items-center px-2.5 shadow-xl w-60 h-10 rounded-lg mt-10 ml-20">
      <span
        className="text-gray-light font-bold text-xs cursor-pointer hover:text-gray-base"
        onClick={() => {
          setProfileActiveCategories({
            ...profileActiveCategories,
            profileActiveCategories: "all",
          });
        }}
      >
        All
      </span>
      <div className="bg-gray-inputborder w-px h-2/3 ml-2.5 mr-2.5"></div>
      <div className="flex items-center w-full h-full  justify-between">
        {categoriesList.map((category) => {
          return (
            <div
              className="w-7 flex justify-center cursor-pointer h-full category-underline"
              key={category.id}
              onClick={() => {
                setProfileActiveCategories({
                  ...profileActiveCategories,
                  profileActiveCategories: category.title,
                });
              }}
            >
              <img src={category.icon} className="" alt={category.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
