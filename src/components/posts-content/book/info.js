import React from "react";

export default function BookInfo({ object }) {
  const InfoLine = function ({ title, content }) {
    return (
      <div className="flex mb-1 lptpXS:w-60">
        <p className="text-sm font-semibold mr-1.5 lptpXS:text-xs">{title}</p>
        <span className="text-sm text-contentbreaks lptpXS:text-xs">
          {content}
        </span>
      </div>
    );
  };

  const genres = object.genres.map((element) => element.label);

  return (
    <div className="flex font-fontbasic text-primary flex-col w-full px-4 relative">
      <div className="flex flex-col mt-4 w-96">
        <InfoLine title="Title:" content={`“${object.booksTitle}”`} />
        <InfoLine title="Author:" content={object.author} />
        <InfoLine title="Year:" content={object.year.label} />
        <InfoLine title="Genres:" content={genres.join(", ")} />
      </div>
      <div className="text-sm lptpXS:text-xs">
        <InfoLine title="Description:" content={null} />
        <p className=" mb-2 text-contentbreaks">
          <img
            src={object.coverPhoto}
            align="right"
            className="w-48 -mt-32 ml-2 right-10 top-4 h-72 object-cover lptpXS:w-38 lptpXS:h-56 "
          />
          {object.description}
        </p>
      </div>
    </div>
  );
}
