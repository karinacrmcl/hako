import PropTypes from "prop-types";
import { useReducer, useEffect, useState } from "react";
import { getUserPublicationsByUsername } from "../../services/firebase";
import UserInfo from "./userinfo";
import Publications from "./publications";
import Sorting from "./sorting";
import Pinned from "./pinned-bar";
import PinnedList from "./pinned-list";
import useUser from "../../hooks/use-user";
import { useMediaQuery } from "react-responsive";

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

  const [isPinnedOpened, setIsPinnedOpened] = useState(false);
  const [isOnTop, setIsOnTop] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: "971px" });

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

  useEffect(() => {
    if (isMobile) {
      document.querySelectorAll("#publications")?.forEach((item) => {
        item.addEventListener("scroll", (e) => {
          if (document.getElementById("publications").scrollTop == 0) {
            setIsOnTop(true);
          } else {
            setIsOnTop(false);
          }
        });
      });
    } else {
      return;
    }
  }, [isPinnedOpened]);

  return (
    <div className="flex justify-between container w-full tabletXL:flex-col tabletXL:items-center">
      <div
        className={`flex flex-col items-start tabletXL:items-center transition-all duration-200 mobileXL:w-full ${
          isOnTop ? "mt-0" : "-mt-48 "
        } `}
      >
        {isPinnedOpened ? null : <Sorting isOnTop={isOnTop} />}
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

      <div
        className={`flex flex-col items-end tabletXL:order-first mobileXL:w-full ${
          isOnTop ? "slide-in-top " : "slide-out-top "
        }`}
      >
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
