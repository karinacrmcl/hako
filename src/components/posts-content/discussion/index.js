import React from "react";
import Question from "./question";
import Answers from "./answers";
import useUser from "../../../hooks/use-user";

export default function DiscussionContent({ object }) {
  const { user } = useUser();

  return (
    <>
      <Question object={object} />
      <Answers object={object} currentUserId={user.userId} />
    </>
  );
}
