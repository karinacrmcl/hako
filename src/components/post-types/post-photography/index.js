import React from "react";
import Header from "./header";
import Actions from "../../post/actions";

export default function PostPhotography({ object }) {
  return (
    <div className="mb-14 bg-white w-post rounded-lg shadow-xl">
      <Header object={object} />
      <div className="w-full max-h-post overflow-hidden">
        <img src={object.photo} className="w-full object-cover" />
      </div>

      <Actions
        object={object}
        totalLikes={object.likes}
        publicationDocId={object.docId}
        likedPublication={object.userLikedPublication}
        pinnedPublication={object.userPinnedPublication}
      />
    </div>
  );
}
