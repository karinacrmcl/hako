import React from "react";
import Header from "./header";
import Actions from "../../post/actions";
import Content from "./content";
import Hot from "../is-hot";

export default function PostNews({ object, isHot }) {
  return (
    <div className="mb-14 relative lptpXS:mb-8 bg-white w-post lptpXL:w-postMd lptpXS:w-postSm rounded-lg shadow-xl mobileXL:shadow-none mobileXL:w-full">
      <Header object={object} />
      {isHot ? <Hot /> : null}
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
