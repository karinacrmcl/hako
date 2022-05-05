import Skeleton from "react-loading-skeleton";
import usePhotos from "../../hooks/use-publications";

import { useCategories } from "../../context/categories-selected";
import ArticleContent from "../posts-content/article";
import PostLayout from "../post";
import BookContent from "../posts-content/book";
import PhotographyContent from "../posts-content/photography";
import NewsContent from "../posts-content/news";
import DiscussionContent from "../posts-content/discussion";

export default function Timeline() {
  const { publications } = usePhotos();
  const { activeCategories } = useCategories();

  function getContent(content) {
    switch (content.type) {
      case "article":
        return (
          activeCategories.article && (
            <ArticleContent object={content} key={content.id} />
          )
        );
      case "book":
        return (
          activeCategories.book && (
            <BookContent object={content} key={content.id} />
          )
        );
      case "news":
        return (
          activeCategories.news && (
            <NewsContent object={content} key={content.id} />
          )
        );
      case "discussion":
        return (
          activeCategories.discussion && (
            <DiscussionContent object={content} key={content.id} />
          )
        );
      case "photography":
        return (
          activeCategories.photography && (
            <PhotographyContent object={content} key={content.id} />
          )
        );

      default:
        break;
    }
  }

  return (
    <div
      className="overflow-y-scroll relative max-h-screen z-10 py-20 px-2 -mt-20 mobileXL:-mt-18 mobileXL:w-full mobileXL:px-2 mobileXL:overflow-x-hidden"
      id="publications"
    >
      {!publications ? (
        <>
          <Skeleton
            count={4}
            width={640}
            height={500}
            className="mb-5 ml-36 lptpXL:ml-32 lptpXS:ml-10 tabletXL:ml-4 mobileXL:ml-0"
          />
        </>
      ) : publications?.length > 0 ? (
        publications.map((content) => {
          return (
            activeCategories[content.type] && (
              <PostLayout
                object={content}
                isHot={content.isHot}
                key={content.id}
              >
                {getContent(content)}
              </PostLayout>
            )
          );
        })
      ) : (
        <p className="text-center text-2xl">Follow more people to see posts</p>
      )}
    </div>
  );
}
