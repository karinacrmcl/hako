import React from "react";
import Header from "./header";
import Actions from "../../post/actions";
import BookInfo from "./info";
import Footer from "./footer";
import Hot from "../is-hot";

export default function PostBook({ object, isHot }) {
  return (
    <div
      className="font-fontbasic relative mb-14 lptpXS:mb-8 bg-white w-post lptpXL:w-postMd rounded-lg shadow-xl lptpXS:w-postSm mobileXL:shadow-none mobileXL:w-full"
      key={object.key}
    >
      <Header object={object} />
      {isHot ? <Hot /> : null}

      <BookInfo object={object} />
      <Footer />
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
