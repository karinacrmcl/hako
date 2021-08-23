import React from "react";
import Header from "../../post/header";
import Question from "./question";
import Answers from "./answers";
import AddAnswer from "./add-answer";
import useUser from "../../../hooks/use-user";
import Hot from "../is-hot";

export default function PostDiscussion({ object, isHot }) {
  const { user } = useUser();

  return (
    <div className="font-fontbasic relative mb-14 lptpXS:mb-8 bg-white w-post lptpXL:w-postMd lptpXS:w-postSm rounded-lg shadow-xl mobileXL:shadow-none mobileXL:w-full">
      <Header object={object} user={user} /> {isHot ? <Hot /> : null}
      <Question object={object} />
      <Answers object={object} currentUserId={user.userId} />
    </div>
  );
}
