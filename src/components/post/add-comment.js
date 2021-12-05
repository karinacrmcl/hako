import { useState, useContext } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import useUser from "../../hooks/use-user";

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);

  // const {
  //   user: { displayName },
  // } = useContext(UserContext);

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
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6754 7.41546L12.8003 1.47855C12.1985 0.958824 11.25 1.38074 11.25 2.18808V5.31515C4.97543 5.38699 0 6.64453 0 12.5909C0 14.9909 1.54613 17.3685 3.2552 18.6116C3.78852 18.9996 4.54859 18.5127 4.35195 17.8839C2.5807 12.2193 5.19207 10.7155 11.25 10.6283V14.0625C11.25 14.8711 12.1992 15.2911 12.8003 14.772L19.6754 8.83453C20.1079 8.46101 20.1085 7.78949 19.6754 7.41546Z"
                fill="url(#paint0_linear_166:367)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_166:367"
                  x1="10"
                  y1="1.25"
                  x2="10"
                  y2="18.75"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9A86B5" />
                  <stop offset="1" stopColor="#D3EEE6" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6754 7.41546L12.8003 1.47855C12.1985 0.958824 11.25 1.38074 11.25 2.18808V5.31515C4.97543 5.38699 0 6.64453 0 12.5909C0 14.9909 1.54613 17.3685 3.2552 18.6116C3.78852 18.9996 4.54859 18.5127 4.35195 17.8839C2.5807 12.2193 5.19207 10.7155 11.25 10.6283V14.0625C11.25 14.8711 12.1992 15.2911 12.8003 14.772L19.6754 8.83453C20.1079 8.46101 20.1085 7.78949 19.6754 7.41546Z"
                fill="#EBEBEB"
              />
            </svg>
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
