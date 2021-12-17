/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { getSuggestedProfiles } from "../../services/firebase";
import SuggestedProfile from "./suggested-profile";

export default function Suggestions({
  userId,
  following,
  loggedInUserDocId,
  avatarUrl,
}) {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  return !profiles ? (
    <Skeleton count={1} height={150} />
  ) : profiles.length > 0 ? (
    <div className="rounded-lg flex flex-col shadow-xl bg-white p-4 ">
      <div className="text-sm flex items-center align-items w-full justify-center mb-2">
        <p className="font-semibold text-primary text-lg lptpXS:text-base ">
          Suggestions for you
        </p>
      </div>
      <div className="mt-4 grid gap-3 lptpXS:mt-1">
        {profiles.slice(0, 4).map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            avatarUrl={profile.avatarUrl}
            userId={userId}
            loggedInUserDocId={loggedInUserDocId}
            profiles={profiles}
            setProfiles={setProfiles}
          />
        ))}
      </div>
    </div>
  ) : (
    <div className="rounded-lg flex flex-col shadow-xl bg-white p-4 ">
      <p className="font-semibold text-primary text-lg lptpXS:text-base ">
        Suggestions for you
      </p>
      <p className="text-sm w-72 text-gray-sugtop"> Nothing found.</p>
    </div>
  );
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};
