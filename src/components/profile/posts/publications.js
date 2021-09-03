import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { useProfileCategories } from "../../../hooks/use-profile-categories";
import PostLayout from "../../post";
import ArticleContent from "../../posts-content/article";
import BookContent from "../../posts-content/book";
import DiscussionContent from "../../posts-content/discussion";
import NewsContent from "../../posts-content/news";
import PhotographyContent from "../../posts-content/photography";

export default function Publications({ publications }) {
  const { profileActiveCategories } = useProfileCategories();

  return (
    <div
      className="overflow-y-scroll max-h-screen py-28 -mt-24 px-2 mobileSM:-mt-30 mobileSM:px-0 mobileXL:w-full mobileXL:overflow-x-hidden"
      id="publications"
    >
      {publications?.length > 0 ? (
        publications.map((content) => {
          switch (content.type) {
            case "article":
              return (
                profileActiveCategories.profileActiveCategories ===
                  "article" && (
                  <PostLayout object={content}>
                    <ArticleContent object={content} key={content.id} />
                  </PostLayout>
                )
              );
            case "book":
              return (
                profileActiveCategories.profileActiveCategories === "book" && (
                  <PostLayout object={content}>
                    <BookContent object={content} key={content.id} />
                  </PostLayout>
                )
              );
            case "news":
              return (
                profileActiveCategories.profileActiveCategories === "news" && (
                  <PostLayout object={content}>
                    <NewsContent object={content} key={content.id} />
                  </PostLayout>
                )
              );
            case "discussion":
              return (
                profileActiveCategories.profileActiveCategories ===
                  "discussion" && (
                  <PostLayout object={content}>
                    <DiscussionContent object={content} key={content.id} />
                  </PostLayout>
                )
              );
            case "photography":
              return (
                profileActiveCategories.profileActiveCategories ===
                  "photography" && (
                  <PostLayout object={content}>
                    <PhotographyContent object={content} key={content.id} />
                  </PostLayout>
                )
              );

            default:
              return (
                <p className="text-center text-2xl"> No publications yet </p>
              );
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
                return (
                  <PostLayout object={content} isHot={content.isHot}>
                    <ArticleContent object={content} key={content.id} />
                  </PostLayout>
                );
              case "book":
                return (
                  <PostLayout object={content} isHot={content.isHot}>
                    <BookContent object={content} key={content.id} />
                  </PostLayout>
                );
              case "news":
                return (
                  <PostLayout object={content} isHot={content.isHot}>
                    <NewsContent object={content} key={content.id} />
                  </PostLayout>
                );
              case "discussion":
                return (
                  <PostLayout object={content} isHot={content.isHot}>
                    <DiscussionContent object={content} key={content.id} />
                  </PostLayout>
                );
              case "photography":
                return (
                  <PostLayout object={content} isHot={content.isHot}>
                    <PhotographyContent object={content} key={content.id} />
                  </PostLayout>
                );

              default:
                return (
                  <p className="text-center text-2xl"> No publications yet </p>
                );
                break;
            }
          })
        : null}
    </div>
  );
}

Publications.propTypes = {
  publications: PropTypes.array.isRequired,
};
