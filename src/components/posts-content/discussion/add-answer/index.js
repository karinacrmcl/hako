import React, { useContext, useState } from "react";
import useUser from "../../../../hooks/use-user";
import { addAnswerToDiscussion } from "../../../../services/firebase";
import SvgSelector from "../../svg-selector";

export default function AddAnswer({ object, setAnswers, answers }) {
  const {
    user: { userId, avatarUrl },
  } = useUser();

  const [answerContent, setAnswerContent] = useState("");
  const [sendBtnHovered, setSendBtnHovered] = useState(false);

  function saveDataAndAddAnswer() {
    const answer = {
      userAuthor: userId,
      upVotes: [],
      downVotes: [],
      content: answerContent,
      id: new Date().getTime().toString(),
    };
    if (answerContent != "") {
      addAnswerToDiscussion(object.docId, answer);
      document
        .querySelector("#content")
        .classList.remove("border-red-primary", "placeholder-red-primary");
      setAnswerContent("");
      let content = answer.content;
      let downVotes = answer.downVotes;
      let upVotes = answer.upVotes;
      let userAuthor = answer.userAuthor;
      let id = answer.id;
      setAnswers([
        {
          content,
          downVotes,
          upVotes,
          userAuthor,
          id,
        },
        ...answers,
      ]);
    } else {
      document
        .querySelector("#content")
        .classList.add("border-red-primary", "placeholder-red-primary");
    }
  }

  return (
    <div className="w-full rounded-b-lg shadow-addanswer px-4 p-4 mt-4 lptpXS:mt-1">
      <div className="flex justify-between items-center w-full">
        <img
          src={avatarUrl?.min}
          className="avatar-addanswer rounded-full object-cover lptpXS:w-6 lptpXS:h-6"
        />
        <input
          placeholder="What do you think?"
          className="w-full border-b ml-2 border-gray-inputborder text-sm outline-none text-gray-addtext lptpXS:text-xs"
          value={answerContent}
          id={"content"}
          onChange={({ target }) => setAnswerContent(target.value)}
        />
        <button
          className="ml-2"
          onClick={() => saveDataAndAddAnswer()}
          onMouseEnter={() => {
            setSendBtnHovered(true);
          }}
          onMouseLeave={() => {
            setSendBtnHovered(false);
          }}
        >
          {sendBtnHovered ? (
            <SvgSelector id="send-hover" />
          ) : (
            <SvgSelector id="send" />
          )}
        </button>
      </div>
    </div>
  );
}
