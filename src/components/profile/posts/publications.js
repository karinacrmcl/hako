import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { useProfileCategories } from "../../../context/profile-categories";
import { getContent } from "../../../utils/get-content";
import PostLayout from "../../post";

export default function Publications({ publications }) {
  const { profileActiveCategories } = useProfileCategories();

  return (
    <div
      className="overflow-y-scroll max-h-screen py-28 -mt-24 px-2 mobileSM:-mt-30 mobileSM:px-0 mobileXL:w-full mobileXL:overflow-x-hidden"
      id="publications"
    >
      {publications?.length > 0 ? (
        publications.map((content) => {
          return (
            profileActiveCategories.profileActiveCategories ===
              content.type && (
              <PostLayout object={content}>{getContent(content)}</PostLayout>
            )
          );
        })
      ) : !publications ? (
        <Skeleton count={1} width={640} height={500} className="mb-5 " />
      ) : (
        <p className="text-center text-2xl"> No publications yet </p>
      )}

      {profileActiveCategories.profileActiveCategories === "all"
        ? publications.map((content) => {
            return (
              <PostLayout object={content}>{getContent(content)}</PostLayout>
            );
          })
        : null}
    </div>
  );
}

Publications.propTypes = {
  publications: PropTypes.array.isRequired,
};
