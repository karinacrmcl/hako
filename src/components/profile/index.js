import PropTypes from "prop-types";
import { useReducer, useEffect, useState } from "react";
import { getUserPublicationsByUsername } from "../../services/firebase";
import UserInfo from "./userinfo";
import Publications from "./publications";
import Sorting from "./sorting";
import Pinned from "./pinned-bar";
import PinnedList from "./pinned-list";
import useUser from "../../hooks/use-user";

export default function UserProfile({ profileUser }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    publicationsCollection: [],
    followerCount: 0,
  };
  const [{ profile, publicationsCollection, followerCount }, dispatch] =
    useReducer(reducer, initialState);

  const {
    user: { userId },
  } = useUser();

  useEffect(() => {
    async function getProfileInfoAndPublications() {
      const publications = await getUserPublicationsByUsername(
        profileUser.username,
        userId
      );
      dispatch({
        profile: profileUser,
        publicationsCollection: publications,
        followerCount: profileUser.followers.length,
      });
    }
    if (profileUser.username && userId) {
      getProfileInfoAndPublications();
    }
  }, [profileUser.username, userId]);

  const [isPinnedOpened, setIsPinnedOpened] = useState(false);

  return (
    <div className="flex justify-between container">
      <div className="flex flex-col items-start">
        {isPinnedOpened ? null : <Sorting />}
        {isPinnedOpened ? (
          <PinnedList
            profile={profile}
            setIsOpen={setIsPinnedOpened}
            userId={userId}
          />
        ) : (
          <Publications publications={publicationsCollection} />
        )}
      </div>

      <div className="fixed top-24 right-40 flex flex-col items-end mr-20">
        <UserInfo
          photosCount={
            publicationsCollection ? publicationsCollection.length : 0
          }
          profile={profile}
          followerCount={followerCount}
          setFollowerCount={dispatch}
        />

        <Pinned
          pinnedPublications={profile.pinnedPublications}
          setIsOpen={setIsPinnedOpened}
          isOpen={isPinnedOpened}
        />
      </div>
    </div>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAdress: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string,
  }),
};
