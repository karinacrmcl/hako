import React from "react";

export default function Question({ object }) {
  return (
    <div className="flex flex-col w-full mt-3 px-4">
      <p className="text-base italic text-gray-sugtop ">Suggested topic </p>
      <h2 className="font-semibold text-xl mt-1 text-contentbreaks">
        {object.question}
      </h2>
      <p className="font-fontbasic text-sm text-primary text-contentbreaks">
        {object.opinion}
      </p>
      <hr className="mt-4 bg-gray-light border-transparent h-0.5 bg-gradient-to-r from-gradient-from to-gradient-to " />
    </div>
  );
}
