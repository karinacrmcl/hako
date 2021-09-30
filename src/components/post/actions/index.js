import { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../../context/firebase";
import UserContext from "../../../context/user";
import { addPublicationToPinned } from "../../../services/firebase";
import useUser from "../../../hooks/use-user";
import Comments from "../comments/comments";
import {
  CommentsButton,
  LikeButton,
  PinButton,
} from "../../category-sorting/svg-selector";

export default function Actions({
  object,
  likedPublication,
  pinnedPublication,
}) {
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);
  const {
    user: { docId },
  } = useUser();

  const { Firebase, FieldValue } = useContext(FirebaseContext);
  const [showComments, setShowComments] = useState(false);

  const [toggleLiked, setToggleLiked] = useState(likedPublication);
  const [togglePinned, setTogglePinned] = useState(pinnedPublication);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    await Firebase.firestore()
      .collection("users")
      .doc(docId)
      .update({
        likedPublications: toggleLiked
          ? FieldValue.arrayRemove(object.docId)
          : FieldValue.arrayUnion(object.docId),
      });
  };

  const handleTogglePinned = async () => {
    setTogglePinned((togglePinned) => !togglePinned);

    await Firebase.firestore()
      .collection("users")
      .doc(docId)
      .update({
        pinnedPublications: togglePinned
          ? FieldValue.arrayRemove(object.id)
          : FieldValue.arrayUnion(object.id),
      });
  };

  const commentInput = useRef(null);

  return (
    <div>
      <div className="flex w-full justify-between py-3 px-4 h-14 rounded-b-lg select-none">
        <div className="flex select-none">
          <LikeButton
            toggleLiked={toggleLiked}
            handleToggleLiked={handleToggleLiked}
          />

          <CommentsButton
            setShowComments={setShowComments}
            showComments={showComments}
          />
        </div>
        <div>
          <PinButton
            handleTogglePinned={handleTogglePinned}
            togglePinned={togglePinned}
          />
        </div>
      </div>
      {showComments && object ? (
        <Comments
          docId={object.docId}
          comments={object.comments}
          posted={object.posted}
          commentInput={commentInput}
        />
      ) : null}
    </div>
  );
}

// Actions.propTypes = {
//   docId: PropTypes.string.isRequired,
//   totalLikes: PropTypes.number.isRequired,
//   likedPhoto: PropTypes.bool.isRequired,
//   handleFocus: PropTypes.func.isRequired,
// };
