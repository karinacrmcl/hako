import React from "react";
import Header from "./header";
import Actions from "../../post/actions";
import Content from "./content";

export default function PostNews({ object }) {
  return (
    <div className="mb-14 bg-white w-post rounded-lg shadow-xl">
      <Header object={object} />
      <Content object={object} />
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
