import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../../context/firebase";
import UserContext from "../../../context/user";
import useUser from "../../../hooks/use-user";
import SvgSelector from "../../../shared/assets/svg-selector";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const {
    user: { userId, avatarUrl },
  } = useUser();
  const [sendBtnHovered, setSendBtnHovered] = useState(false);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ userId, comment, dateCreated, id }, ...comments]);
    setComment("");

    return firebase
      .firestore()
      .collection("publications")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({
          userId,
          comment,
          dateCreated,
          id,
        }),
      });
  };

  const options = {
    weekday: "short",
    hour: "numeric",
  };
  const dateCreated = new Date().toLocaleDateString("en-US", options);

  const id = new Date().getTime().toString() + Math.round(Math.random() * 100);

  return (
    <div className="px-4 py-2">
      <form
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
        className="flex justify-between "
      >
        <img
          src={avatarUrl ? avatarUrl.min : null}
          className="w-11 h-11 mr-2 rounded-full lptpXS:w-9 lptpXS:h-9"
        />
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base rounded-lg w-full py-2 px-2 mr-2 border border-2 border-gray-inputborder lptpXS:py-1 lptpXS:px-1 lptpXS:h-8 lptpXS:text-xs "
          type="text"
          name="add-comment"
          placeholder="Add a comment.."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && "opacity-60"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
          onMouseEnter={() => {
            setSendBtnHovered(true);
          }}
          onMouseLeave={() => {
            setSendBtnHovered(false);
          }}
        >
          {sendBtnHovered ? (
            <SvgSelector id="comment-send" />
          ) : (
            <SvgSelector id="comment-send-inactive" />
          )}
        </button>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object,
};
