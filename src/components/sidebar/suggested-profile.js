import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/firebase";

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
  avatarUrl,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="flex items-center align-items font-fontbasic w-72 px-2.5 mt-0 justify-between">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-10 h-10 flex mr-2 object-cover avatar-list"
          src={avatarUrl.min}
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="font-medium text-primary text-sm">{username}</p>
        </Link>
      </div>
      <div>
        <button
          className=""
          onClick={() => {
            handleFollowUser();
          }}
          type="button"
        >
          <svg
            width="24"
            height="21"
            viewBox="0 0 24 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="21" fill="white" />
            <path
              d="M21 6V10"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M19 8H23"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="11.5" cy="5.5" r="4.5" stroke="black" strokeWidth="2" />
            <path
              d="M11.5 10C6.5905 10 2.55081 13.7242 2.05184 18.5016C1.99447 19.0509 2.44772 19.5 3 19.5H19.5C20.0523 19.5 20.505 19.0511 20.4541 18.5012C20.0112 13.724 16.4094 10 11.5 10Z"
              stroke="black"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
