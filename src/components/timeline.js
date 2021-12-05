import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";

import PostArticle from "./post-types/post-article";
import PostBook from "./post-types/post-book";
import PostNews from "./post-types/post-news";
import PostDiscussion from "./post-types/post-discussion";
import PostPhotography from "./post-types/post-photography";

import { useCategories } from "../hooks/use-categorysorting";
import Hot from "./post-types/is-hot";

export default function Timeline() {
  const { publications } = usePhotos();
  const { activeCategories } = useCategories();

  return (
    <div
      className="overflow-y-scroll max-h-screen py-20 px-2 -mt-20 mobileXL:-mt-18 mobileXL:w-full mobileXL:px-2 mobileXL:overflow-x-hidden"
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
          switch (content.type) {
            case "article":
              return (
                activeCategories.article && (
                  <PostArticle
                    object={content}
                    isHot={content.isHot}
                    key={content.id}
                  />
                )
              );

            case "book":
              return (
                activeCategories.book && (
                  <PostBook
                    key={content.id}
                    object={content}
                    isHot={content.isHot}
                  />
                )
              );
            case "news":
              return (
                activeCategories.news && (
                  <PostNews
                    key={content.id}
                    object={content}
                    isHot={content.isHot}
                  />
                )
              );
            case "discussion":
              return (
                activeCategories.discussion && (
                  <PostDiscussion
                    key={content.id}
                    object={content}
                    isHot={content.isHot}
                  />
                )
              );
            case "photography":
              return (
                activeCategories.photography && (
                  <PostPhotography
                    key={content.id}
                    object={content}
                    isHot={content.isHot}
                  />
                )
              );

              break;

            default:
              break;
          }
        })
      ) : (
        <p className="text-center text-2xl">Follow more people to see posts</p>
      )}
    </div>
  );
}
