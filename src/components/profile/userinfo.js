import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import propTypes from "prop-types";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import FollowerList from "./follows/followers-list";
import FollowingList from "./follows/following-list";

export default function UserInfo({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    followers = [],
    following = [],
    username: profileUsername,
    avatarUrl: avatarUrl,
  },
  followerCount,
  setFollowerCount,
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeButtonFollow = user.username && user.username != profileUsername;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1,
    });
    await toggleFollow(
      isFollowingProfile,
      user.docId,
      profileDocId,
      profileUserId,
      user.userId
    );
  };

  const SvgFollow = () => {
    return (
      <svg
        width="20"
        height="18"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.5 6.5H17.5V4.5C17.5 4.225 17.275 4 17 4H16C15.725 4 15.5 4.225 15.5 4.5V6.5H13.5C13.225 6.5 13 6.725 13 7V8C13 8.275 13.225 8.5 13.5 8.5H15.5V10.5C15.5 10.775 15.725 11 16 11H17C17.275 11 17.5 10.775 17.5 10.5V8.5H19.5C19.775 8.5 20 8.275 20 8V7C20 6.725 19.775 6.5 19.5 6.5ZM7 8C9.20937 8 11 6.20937 11 4C11 1.79063 9.20937 0 7 0C4.79063 0 3 1.79063 3 4C3 6.20937 4.79063 8 7 8ZM9.8 9H9.27812C8.58437 9.31875 7.8125 9.5 7 9.5C6.1875 9.5 5.41875 9.31875 4.72188 9H4.2C1.88125 9 0 10.8812 0 13.2V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V13.2C14 10.8812 12.1188 9 9.8 9Z"
          fill="white"
        />
      </svg>
    );
  };

  const SvgUnfollow = () => {
    return (
      <svg
        width="20"
        height="16"
        viewBox="0 0 20 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 8C9.20937 8 11 6.20937 11 4C11 1.79063 9.20937 0 7 0C4.79063 0 3 1.79063 3 4C3 6.20937 4.79063 8 7 8ZM9.8 9H9.27812C8.58437 9.31875 7.8125 9.5 7 9.5C6.1875 9.5 5.41875 9.31875 4.72188 9H4.2C1.88125 9 0 10.8812 0 13.2V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V13.2C14 10.8812 12.1188 9 9.8 9ZM19.8937 4.9875L19.025 4.10938C18.8812 3.9625 18.6469 3.9625 18.5 4.10625L15.225 7.35625L13.8031 5.925C13.6594 5.77813 13.425 5.77813 13.2781 5.92188L12.4 6.79375C12.2531 6.9375 12.2531 7.17187 12.3969 7.31875L14.95 9.89062C15.0937 10.0375 15.3281 10.0375 15.475 9.89375L19.8906 5.5125C20.0344 5.36562 20.0375 5.13125 19.8937 4.9875V4.9875Z"
          fill="white"
        />
      </svg>
    );
  };

  const [isFollowersHovered, setIsFollowersHovered] = useState(false);
  const [isFollowingHovered, setIsFollowingHovered] = useState(false);

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(!!isFollowing);
    };
    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  return (
    <div className="bg-white w-userinfo rounded-lg shadow-xl py-6 flex px-4 justify-between flex flex-col mx-auto lptpXL:w-userinfoMD lptpXS:w-userinfoSM tabletXL:w-96 mobileXL:w-full mobileXL:py-3 mobileXL:shadow-none mobileSM:px-2">
      <div className="flex items-center">
        {user.username && avatarUrl ? (
          <img
            className="rounded-full avatar-userinfo object-cover flex lptpXS:w-10 mobileXL:w-8"
            alt={user.username}
            src={avatarUrl?.basic}
          />
        ) : (
          <Skeleton width={100} height={100} className="rounded-full" />
        )}

        <div className="container flex items-center justify-between ">
          <div className="flex flex-col ml-4 lptpXS:ml-2">
            <p className="text-lg font-medium lptpXS:text-base ">
              {!profileUsername ? (
                <Skeleton width={80} height={24} />
              ) : (
                profileUsername
              )}
            </p>
            <div className="text-contentbreaks lptpXS:text-sm ">
              {!fullName ? <Skeleton width={150} height={24} /> : fullName}
            </div>
          </div>
          {activeButtonFollow && (
            <button
              className={`flex justify-center items-center w-10 h-9 rounded-lg transition-all ${
                isFollowingProfile
                  ? "bg-gradient-to-b from-gradient-from to-gradient-to"
                  : "bg-gradient-to-b from-gradient-from to-gradient-to via-black bg-size-200 bg-pos-0 hover:bg-pos-100"
              } `}
              type="button"
              onClick={handleToggleFollow}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleToggleFollow();
                }
              }}
            >
              {isFollowingProfile ? <SvgUnfollow /> : <SvgFollow />}
            </button>
          )}
        </div>
      </div>

      <div className="container flex mt-4 justify-evenly w-4/5 select-none lptpXS:mt-2">
        {followers == undefined || following == undefined ? (
          <Skeleton count={1} width={677} height={24} />
        ) : (
          <>
            <p className="flex font-medium flex-col text-sm items-center  lptpXS:text-xs">
              <span className="font-semibold text-xl lptpXS:text-lg">
                {photosCount}
              </span>
              publications
            </p>
            <div
              className=" flex font-medium flex-col text-sm items-center  lptpXS:text-xs"
              onMouseEnter={() =>
                followerCount == 0 ? null : setIsFollowersHovered(true)
              }
              onMouseLeave={() => setIsFollowersHovered(false)}
            >
              <span className="font-semibold text-xl lptpXS:text-lg">
                {followerCount}
              </span>
              {isFollowersHovered && <FollowerList list={followers} />}
              {followerCount == 1 ? `follower` : `followers`}
            </div>
            <div
              className="flex font-medium flex-col text-sm items-center lptpXS:text-xs "
              onMouseEnter={() =>
                following.length == 0
                  ? setIsFollowingHovered(false)
                  : setIsFollowingHovered(true)
              }
              onMouseLeave={() => setIsFollowingHovered(false)}
            >
              <span className="font-semibold text-xl lptpXS:text-lg">
                {following.length}
              </span>
              {isFollowingHovered && <FollowingList list={following} />}
              following
            </div>
          </>
        )}
      </div>
    </div>
  );
}

UserInfo.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    followers: PropTypes.array,
    following: PropTypes.array,
  }).isRequired,
};
