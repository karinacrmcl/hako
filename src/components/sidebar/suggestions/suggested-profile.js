import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../../services/firebase";
import SvgSelector from "../svg-selector";

export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
  avatarUrl,
  profiles,
  setProfiles,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);
    await updateFollowedUserFollowers(profileDocId, userId, false);

    setProfiles(
      profiles.filter((obj) => {
        return obj.userId !== profileId;
      })
    );
  }

  return !followed ? (
    <div className="flex items-center align-items font-fontbasic w-72 lptpXL:w-64 px-2.5 mt-0 justify-between lptpXS:px-0 lptpXS:w-48 ">
      <div className="flex items-center justify-between">
        <img
          className="rounded-full w-10 h-10 flex mr-2 object-cover avatar-list lptpXS:w-8 lptpXS:h-8  lptpXS:min-w-min lptpXS:min-h-full "
          src={avatarUrl.min}
        />
        <Link to={`/p/${username}`}>
          <p className="font-medium text-primary text-sm lptpXS:text-xs lptpXS:font-medium">
            {username}
          </p>
        </Link>
      </div>
      <div>
        <button
          onClick={() => {
            handleFollowUser();
          }}
          type="button"
        >
          <SvgSelector id="user-add" />
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
