import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { useProfileCategories } from "../../hooks/use-profile-categories";
import PostArticle from "../post-types/post-article";
import PostBook from "../post-types/post-book";
import PostDiscussion from "../post-types/post-discussion";
import PostNews from "../post-types/post-news";
import PostPhotography from "../post-types/post-photography";

export default function Publications({ publications }) {
  const { profileActiveCategories } = useProfileCategories();

  return (
    <div className="h-16 mt-8 ml-20 ">
      {publications?.length > 0 ? (
        publications.map((content) => {
          switch (content.type) {
            case "article":
              return (
                profileActiveCategories.profileActiveCategories ===
                  "article" && <PostArticle key={content.id} object={content} />
              );
            case "book":
              return (
                profileActiveCategories.profileActiveCategories === "book" && (
                  <PostBook key={content.id} object={content} />
                )
              );
            case "news":
              return (
                profileActiveCategories.profileActiveCategories === "news" && (
                  <PostNews key={content.id} object={content} />
                )
              );
            case "discussion":
              return (
                profileActiveCategories.profileActiveCategories ===
                  "discussion" && (
                  <PostDiscussion key={content.id} object={content} />
                )
              );
            case "photography":
              return (
                profileActiveCategories.profileActiveCategories ===
                  "photography" && (
                  <PostPhotography key={content.id} object={content} />
                )
              );

            default:
              return (
                <p className="text-center text-2xl"> No publications yet </p>
              );
              break;
          }
        })
      ) : !publications ? (
        <Skeleton count={1} width={640} height={500} className="mb-5 " />
      ) : (
        <p className="text-center text-2xl"> No publications yet </p>
      )}

      {profileActiveCategories.profileActiveCategories === "all"
        ? publications.map((content) => {
            switch (content.type) {
              case "article":
                return <PostArticle key={content.id} object={content} />;
              case "book":
                return <PostBook key={content.id} object={content} />;
              case "news":
                return <PostNews key={content.id} object={content} />;
              case "discussion":
                return <PostDiscussion key={content.id} object={content} />;
              case "photography":
                return <PostPhotography key={content.id} object={content} />;

              default:
                return (
                  <p className="text-center text-2xl"> No publications yet </p>
                );
                break;
            }
          })
        : null}

      {/* {!publications && (
        <p className="text-center text-2xl"> No publications yet </p>
      )} */}
    </div>
  );
}

Publications.propTypes = {
  publications: PropTypes.array.isRequired,
};
