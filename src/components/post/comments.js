import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AddComment from "./add-comment";
import { getUserByUserId } from "../../services/firebase";

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

  const UserComment = ({ item }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      async function getUserObjByUserId() {
        const [user] = await getUserByUserId(item.userId);
        setUser(user);
      }
      if (item?.userId) {
        getUserObjByUserId();
      }
    }, []);

    return (
      <div key={`${item.comment} - ${user?.username}`} className="mb-1 flex ">
        <img
          className="rounded-full avatar-addanswer"
          src={user?.avatarUrl.min}
        />
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col justify-start ml-2">
            <Link to={`/p/${user?.username}`}>
              <span className=" font-bold text-sm">{user?.username}</span>
            </Link>
            <span className=" text-sm">{item.comment}</span>
          </div>
          <p className="text-xs w-28 w-datecreate flex justify-end text-gray-light">
            {item.dateCreated}
          </p>
        </div>
      </div>
      // <div>bruh</div>
    );
  };

  return (
    <>
      <div className="px-4 pt-2 border-t border-gray-inactive relative">
        {comments.slice(0, commentsSlice).map((item) => {
          console.log(item);
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
            <svg
              width="15"
              height="3"
              viewBox="0 0 15 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1.5" cy="1.5" r="1.5" fill="#9A86B5" />
              <circle cx="7.5" cy="1.5" r="1.5" fill="#9A86B5" />
              <circle cx="13.5" cy="1.5" r="1.5" fill="#9A86B5" />
            </svg>
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
