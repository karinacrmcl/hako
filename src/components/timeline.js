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
    <div className="container col-span-2">
      {!publications ? (
        <>
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        </>
      ) : publications?.length > 0 ? (
        publications.map((content) => {
          switch (content.type) {
            case "article":
              return (
                activeCategories.article && (
                  <div className="relative" key={content.id}>
                    <PostArticle object={content} />
                    {content.isHot && <Hot />}
                  </div>
                )
              );

            case "book":
              return (
                activeCategories.book && (
                  <div className="relative" key={content.id}>
                    <PostBook key={content.id} object={content} />
                    {content.isHot && <Hot />}
                  </div>
                )
              );
            case "news":
              return (
                activeCategories.news && (
                  <div className="relative" key={content.id}>
                    <PostNews key={content.id} object={content} />
                    {content.isHot && <Hot />}
                  </div>
                )
              );
            case "discussion":
              return (
                activeCategories.discussion && (
                  <div className="relative" key={content.id}>
                    <PostDiscussion key={content.id} object={content} />
                    {content.isHot && <Hot />}
                  </div>
                )
              );
            case "photography":
              return (
                activeCategories.photography && (
                  <div className="relative" key={content.id}>
                    <PostPhotography key={content.id} object={content} />
                    {content.isHot && <Hot />}
                  </div>
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
