import React, { useRef, useState } from "react";
import Header from "./header";
import Actions from "../../post/actions";
import { getUserByUserId } from "../../../services/firebase";
import Comments from "../../post/comments";
import Hot from "../is-hot";

export default function PostArticle({ object, isHot }) {
  const [readMore, setReadMore] = useState(false);
  function checkContentLength(objectContent) {
    if (objectContent.length < 700 || readMore) {
      return objectContent;
    } else {
      return objectContent.slice(0, 700) + "...";
    }
  }

  return (
    <div
      className="font-fontbasic relative bg-white w-post lptpXS:mb-8 lptpXL:w-postMd lptpXS:w-postSm rounded-lg shadow-xl mb-14 mobileXL:shadow-none mobileXL:w-full "
      key={object.key}
    >
      <Header object={object} />
      {isHot ? <Hot /> : null}
      <div className="w-full flex flex-col items-start px-4 mt-3">
        <h2 className="font-semibold text-xl lptpXS:text-base">
          {object.title}
        </h2>

        <p className="text-sm mt-3 text-contentbreaks lptpXS:text-xs">
          {checkContentLength(object.text)}
          {object.text.length > 700 && (
            <a
              className="text-sm font-semibold cursor-pointer lptpXS:text-xs"
              onClick={() => {
                setReadMore(!readMore);
              }}
            >
              {readMore ? " Show less" : " Read more"}
            </a>
          )}
        </p>
      </div>
      <Actions
        object={object}
        publicationDocId={object.docId}
        likedPublication={object.userLikedPublication}
        pinnedPublication={object.userPinnedPublication}
      />
    </div>
  );
}
