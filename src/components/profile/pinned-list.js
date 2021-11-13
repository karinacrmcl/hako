import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getPinnedPublications } from "../../services/firebase";
import Hot from "../post-types/is-hot";
import PostArticle from "../post-types/post-article";
import PostBook from "../post-types/post-book";
import PostDiscussion from "../post-types/post-discussion";
import PostNews from "../post-types/post-news";
import PostPhotography from "../post-types/post-photography";

export default function PinnedList({ profile, userId }) {
  const [publications, setPublications] = useState(null);
  useEffect(() => {
    async function getPinnedById() {
      const publications = await getPinnedPublications(
        profile.pinnedPublications,
        userId
      );
      setPublications(publications);
    }
    if (profile?.pinnedPublications) {
      getPinnedById();
    }
  }, [profile]);

  return (
    <div className="  w-1/2 h-screen h-16 mt-8 ml-20 bg-white flex justify-start items-start left-0">
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-between">
          {profile.pinnedPublications.length != 0 ? (
            <div className="text-2xl ">
              {profile.fullName.split(" ").slice(0, 1)}'s pinned publications:
            </div>
          ) : (
            <p className="text-2xl  w-96">
              {profile.fullName.split(" ").slice(0, 1)} doesn't have any pinned
              publications yet.
            </p>
          )}
        </div>
        <div className="flex flex-col mt-10">
          {!publications ? (
            <>
              <Skeleton count={4} width={640} height={500} className="mb-5" />
            </>
          ) : publications?.length > 0 ? (
            publications.map((content) => {
              switch (content.type) {
                case "article":
                  return (
                    <div className="relative" key={content.id}>
                      <PostArticle object={content} />
                      {content.isHot && <Hot />}
                    </div>
                  );

                case "book":
                  return (
                    <div className="relative" key={content.id}>
                      <PostBook key={content.id} object={content} />
                      {content.isHot && <Hot />}
                    </div>
                  );
                case "news":
                  return (
                    <div className="relative" key={content.id}>
                      <PostNews key={content.id} object={content} />
                      {content.isHot && <Hot />}
                    </div>
                  );
                case "discussion":
                  return (
                    <div className="relative" key={content.id}>
                      <PostDiscussion key={content.id} object={content} />
                      {content.isHot && <Hot />}
                    </div>
                  );
                case "photography":
                  return (
                    <div className="relative" key={content.id}>
                      <PostPhotography key={content.id} object={content} />
                      {content.isHot && <Hot />}
                    </div>
                  );

                default:
                  break;
              }
            })
          ) : null}
        </div>
      </div>
    </div>
  );
}
