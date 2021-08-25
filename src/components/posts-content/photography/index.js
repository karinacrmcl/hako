import React from "react";
import Header from "../../post/header";
import Actions from "../../post/actions";
import Hot from "../../post/is-hot";

export default function PostPhotography({ object, isHot }) {
  return (
    <div className="mb-14 relative bg-white lptpXS:mb-8 w-post lptpXL:w-postMd lptpXS:w-postSm rounded-lg shadow-xl mobileXL:shadow-none mobileXL:w-full">
      <Header object={object} /> {isHot ? <Hot /> : null}
      <div className="w-full max-h-post  overflow-hidden">
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
