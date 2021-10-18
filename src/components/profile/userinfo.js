import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import propTypes from "prop-types";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import FollowerList from "./follows/followers-list";
import FollowingList from "./follows/following-list";
import SvgSelector from "./svg-selector";

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

  const [isFollowersHovered, setIsFollowersHovered] = useState(false);
  const [isFollowingHovered, setIsFollowingHovered] = useState(false);

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.username,
        profileUserId
      );
      setIsFollowingProfile(isFollowing);
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
              {isFollowingProfile ? (
                <SvgSelector id="unfollow" />
              ) : (
                <SvgSelector id="follow" />
              )}
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
