import { useState } from "react";
import PropTypes from "prop-types";

import AddComment from "./add-comment";
import SvgSelector from "../svg-selector";
import { UserComment } from "./comment";

export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 6);
  };

  return (
    <>
      <div className="px-4 pt-2 border-t border-gray-inactive relative">
        {comments.slice(0, commentsSlice).map((item) => {
          return <UserComment item={item} key={item.id} />;
        })}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full flex justify-center dots-bg h-1/2 items-end"
            type="button"
            onClick={(e) => {
              showNextComments();
              e.currentTarget.classList.remove("dots-bg");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                showNextComments();
              }
            }}
          >
            <SvgSelector id="dots" />
          </button>
        )}
        <p className="text-gray-base uppercase text-xs mt-2">{posted}</p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number,
  commentInput: PropTypes.object.isRequired,
};
