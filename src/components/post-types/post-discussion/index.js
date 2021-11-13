import React from "react";
import Header from "./header";
import Question from "./question";
import Answers from "./answers";
import AddAnswer from "./add-answer";
import useUser from "../../../hooks/use-user";

export default function PostDiscussion({ object }) {
  const { user } = useUser();

  return (
    <div className="font-fontbasic mb-14 bg-white w-post rounded-lg shadow-xl">
      <Header object={object} user={user} />
      <Question object={object} />
      <Answers object={object} currentUserId={user.userId} />
    </div>
  );
}
