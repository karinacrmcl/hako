import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { getPinnedPublications } from "../../../services/firebase";
import PostLayout from "../../post";
import ArticleContent from "../../posts-content/article";
import BookContent from "../../posts-content/book";
import DiscussionContent from "../../posts-content/discussion";
import NewsContent from "../../posts-content/news";
import PhotographyContent from "../../posts-content/photography";

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
    <div
      className="overflow-y-scroll max-h-screen py-28 -mt-24 bg-white flex justify-start items-start left-0 px-2 mobileXL:bg-transparent"
      id="publications"
    >
      <div className="flex flex-col items-center">
        <div className="flex w-full justify-between">
          {profile.pinnedPublications.length != 0 ? (
            <div className="text-2xl lptpXL:text-xl  ">
              {profile.fullName.split(" ").slice(0, 1)}'s pinned publications:
            </div>
          ) : (
            <p className="text-2xl lptpXL:text-xl   w-96">
              {profile.fullName.split(" ").slice(0, 1)} doesn't have any pinned
              publications yet.
            </p>
          )}
        </div>
        <div className="flex flex-col mt-10 mobileXL:mt-5">
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
                      <PostLayout object={content} isHot={content.isHot}>
                        <ArticleContent object={content} key={content.id} />
                      </PostLayout>
                    </div>
                  );

                case "book":
                  return (
                    <div className="relative" key={content.id}>
                      <PostLayout object={content} isHot={content.isHot}>
                        <BookContent object={content} key={content.id} />
                      </PostLayout>
                    </div>
                  );
                case "news":
                  return (
                    <div className="relative" key={content.id}>
                      <PostLayout object={content} isHot={content.isHot}>
                        <NewsContent object={content} key={content.id} />
                      </PostLayout>
                    </div>
                  );
                case "discussion":
                  return (
                    <div className="relative" key={content.id}>
                      <PostLayout object={content} isHot={content.isHot}>
                        <DiscussionContent object={content} key={content.id} />
                      </PostLayout>
                    </div>
                  );
                case "photography":
                  return (
                    <div className="relative" key={content.id}>
                      <PostLayout object={content} isHot={content.isHot}>
                        <PhotographyContent object={content} key={content.id} />
                      </PostLayout>
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
