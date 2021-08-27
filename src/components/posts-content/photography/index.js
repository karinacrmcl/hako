import React from "react";

export default function PhotographyContent({ object, isHot }) {
  return (
    <>
      <div className="w-full max-h-post  overflow-hidden">
        <img src={object.photo} className="w-full object-cover" />
      </div>
    </>
  );
}
