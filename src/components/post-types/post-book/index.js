import React from "react";
import Header from "./header";
import Actions from "../../post/actions";
import BookInfo from "./info";
import Footer from "./footer";

export default function PostBook({ object }) {
  return (
    <div
      className="font-fontbasic mb-14 bg-white w-post rounded-lg shadow-xl"
      key={object.key}
    >
      <Header object={object} />
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
