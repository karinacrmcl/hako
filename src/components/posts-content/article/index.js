import React, { useRef, useState } from "react";
import Header from "../../post/header";
import Actions from "../../post/actions";
import { getUserByUserId } from "../../../services/firebase";
import Comments from "../../post/comments";
import Hot from "../../post/is-hot";

export default function ArticleContent({ object }) {
  const [readMore, setReadMore] = useState(false);
  function checkContentLength(objectContent) {
    if (objectContent.length < 700 || readMore) {
      return objectContent;
    } else {
      return objectContent.slice(0, 700) + "...";
    }
  }

  return (
    <div className="w-full flex flex-col items-start px-4 mt-3">
      <h2 className="font-semibold text-xl lptpXS:text-base">{object.title}</h2>

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
  );
}
