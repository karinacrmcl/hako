import { useState, useContext, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import Comments from "./comments";
import { addPublicationToPinned } from "../../services/firebase";
import useUser from "../../hooks/use-user";

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

  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [showComments, setShowComments] = useState(false);

  const [toggleLiked, setToggleLiked] = useState(likedPublication);
  const [togglePinned, setTogglePinned] = useState(pinnedPublication);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    await firebase
      .firestore()
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

    await firebase
      .firestore()
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
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-8 mr-4 select-none cursor-pointer focus:outline-none ${
              toggleLiked
                ? "fill-active actions-active"
                : "text-black-light actions-inactive"
            } `}
            onClick={(e) => {
              handleToggleLiked();
            }}
          >
            <path
              d="M19.0587 2.23078C16.9181 0.354471 13.7346 0.691964 11.7698 2.77719L11.0003 3.5928L10.2308 2.77719C8.26987 0.691964 5.08243 0.354471 2.94185 2.23078C0.48877 4.38431 0.359867 8.24942 2.55514 10.5837L10.1136 18.6113C10.6019 19.1296 11.3948 19.1296 11.8831 18.6113L19.4415 10.5837C21.6407 8.24942 21.5118 4.38431 19.0587 2.23078Z"
              stroke="#E1E1E1"
              stroke-width={`${toggleLiked ? "0" : "1.5"}`}
            />

            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#9A86B5", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#D3EEE6", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
          </svg>

          {showComments === true ? (
            <svg
              width="32"
              height="34"
              viewBox="0 0 28 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setShowComments(!showComments);
              }}
              className="cursor-pointer -mt-1"
            >
              <path
                d="M11.5 1.4375C5.14805 1.4375 0 5.61973 0 10.7812C0 13.0094 0.961328 15.0488 2.56055 16.6525C1.99902 18.9166 0.121289 20.9336 0.0988281 20.9561C0 21.0594 -0.0269531 21.2121 0.0314453 21.3469C0.0898438 21.4816 0.215625 21.5625 0.359375 21.5625C3.3377 21.5625 5.57031 20.134 6.67539 19.2535C8.14434 19.8061 9.775 20.125 11.5 20.125C17.852 20.125 23 15.9428 23 10.7812C23 5.61973 17.852 1.4375 11.5 1.4375ZM5.75 12.2188C4.95488 12.2188 4.3125 11.5764 4.3125 10.7812C4.3125 9.98613 4.95488 9.34375 5.75 9.34375C6.54512 9.34375 7.1875 9.98613 7.1875 10.7812C7.1875 11.5764 6.54512 12.2188 5.75 12.2188ZM11.5 12.2188C10.7049 12.2188 10.0625 11.5764 10.0625 10.7812C10.0625 9.98613 10.7049 9.34375 11.5 9.34375C12.2951 9.34375 12.9375 9.98613 12.9375 10.7812C12.9375 11.5764 12.2951 12.2188 11.5 12.2188ZM17.25 12.2188C16.4549 12.2188 15.8125 11.5764 15.8125 10.7812C15.8125 9.98613 16.4549 9.34375 17.25 9.34375C18.0451 9.34375 18.6875 9.98613 18.6875 10.7812C18.6875 11.5764 18.0451 12.2188 17.25 12.2188Z"
                fill="#EBEBEB"
              />
              <path
                d="M11.5 1.4375C5.14805 1.4375 0 5.61973 0 10.7812C0 13.0094 0.961328 15.0488 2.56055 16.6525C1.99902 18.9166 0.121289 20.9336 0.0988281 20.9561C0 21.0594 -0.0269531 21.2121 0.0314453 21.3469C0.0898438 21.4816 0.215625 21.5625 0.359375 21.5625C3.3377 21.5625 5.57031 20.134 6.67539 19.2535C8.14434 19.8061 9.775 20.125 11.5 20.125C17.852 20.125 23 15.9428 23 10.7812C23 5.61973 17.852 1.4375 11.5 1.4375ZM5.75 12.2188C4.95488 12.2188 4.3125 11.5764 4.3125 10.7812C4.3125 9.98613 4.95488 9.34375 5.75 9.34375C6.54512 9.34375 7.1875 9.98613 7.1875 10.7812C7.1875 11.5764 6.54512 12.2188 5.75 12.2188ZM11.5 12.2188C10.7049 12.2188 10.0625 11.5764 10.0625 10.7812C10.0625 9.98613 10.7049 9.34375 11.5 9.34375C12.2951 9.34375 12.9375 9.98613 12.9375 10.7812C12.9375 11.5764 12.2951 12.2188 11.5 12.2188ZM17.25 12.2188C16.4549 12.2188 15.8125 11.5764 15.8125 10.7812C15.8125 9.98613 16.4549 9.34375 17.25 9.34375C18.0451 9.34375 18.6875 9.98613 18.6875 10.7812C18.6875 11.5764 18.0451 12.2188 17.25 12.2188Z"
                fill="url(#paint0_linear_16:450)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_16:450"
                  x1="20"
                  y1="5.5"
                  x2="-4.56422e-07"
                  y2="20.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D3EEE6" />
                  <stop offset="1" stopColor="#9A86B5" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              width="32"
              height="34"
              viewBox="0 0 28 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setShowComments(!showComments);
              }}
              className="cursor-pointer -mt-1"
            >
              <path
                d="M3.28849 16.8956L3.39032 16.485L3.09162 16.1855C1.61141 14.7011 0.75 12.8452 0.75 10.8438C0.75 6.23448 5.4092 2.25 11.5 2.25C17.5908 2.25 22.25 6.23448 22.25 10.8438C22.25 15.453 17.5908 19.4375 11.5 19.4375C9.86769 19.4375 8.32634 19.1357 6.93944 18.614L6.54098 18.4642L6.20803 18.7294C5.28042 19.4685 3.53783 20.5924 1.23494 20.8299C1.39027 20.6306 1.56487 20.3955 1.74584 20.1319C2.3111 19.3086 2.97673 18.1526 3.28849 16.8956ZM0.640738 21.5369C0.643265 21.5342 0.646102 21.5312 0.64924 21.5279C0.646487 21.5309 0.643677 21.534 0.640809 21.537L0.640738 21.5369Z"
                stroke="#E1E1E1"
                stroke-width="1.5"
              />
              <circle
                cx="11.3"
                cy="11"
                r="1.8"
                stroke="#E1E1E1"
                stroke-width="1.5"
              />
              <circle
                cx="17"
                cy="11"
                r="1.8"
                stroke="#E1E1E1"
                stroke-width="1.5"
              />
              <circle
                cx="5.5"
                cy="11"
                r="1.8"
                stroke="#E1E1E1"
                stroke-width="1.5"
              />
            </svg>
          )}
        </div>
        <div>
          <svg
            width="24"
            height="28"
            viewBox="0 0 22 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`w-8 select-none cursor-pointer focus:outline-none ${
              togglePinned
                ? "fill-active actions-active"
                : "text-black-light actions-inactive"
            } `}
            onClick={handleTogglePinned}
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "#9A86B5", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#D3EEE6", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              d="M14.5648 14.4073L14.4495 14.8171L14.7422 15.1262C16.3593 16.8339 17.1269 18.9632 16.3865 20.8309C16.3082 21.0285 16.0846 21.1251 15.8871 21.0468L9.90958 18.6771L9.21237 18.4007L8.93597 19.0979L7.15608 23.5876L5.88442 24.725L5.7375 23.0253L7.5174 18.5355L7.7938 17.8383L7.09658 17.5619L1.11906 15.1922C0.92153 15.1139 0.824888 14.8903 0.903196 14.6928C1.63687 12.8421 3.63847 11.8015 6.00969 11.6643L6.43467 11.6397L6.63144 11.2622L9.22991 6.27729L9.61431 5.53987L8.84125 5.2334L6.98615 4.49798C6.78862 4.41967 6.69198 4.19608 6.77028 3.99855L7.60665 1.88883C7.68496 1.6913 7.90855 1.59466 8.10608 1.67297L20.0611 6.41237C20.2587 6.49068 20.3553 6.71427 20.277 6.9118L19.4406 9.02151C19.3623 9.21904 19.1387 9.31568 18.9412 9.23738L17.0861 8.50195L16.313 8.19548L16.0877 8.99598L14.5648 14.4073ZM5.72993 22.9376C5.72996 22.9379 5.72998 22.9382 5.73001 22.9386L5.72995 22.9379L5.72993 22.9376Z"
              stroke="#E1E1E1"
              stroke-width={`${togglePinned ? "0" : "1.5"}`}
            />
          </svg>
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
