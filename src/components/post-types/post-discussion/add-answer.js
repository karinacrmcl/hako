import React, { useContext, useState } from "react";
import UserContext from "../../../context/user";
import useUser from "../../../hooks/use-user";
import { addAnswerToDiscussion } from "../../../services/firebase";

export default function AddAnswer({ object, setAnswers, answers }) {
  // const { user } = useContext(UserContext);
  const {
    user: { userId, avatarUrl },
  } = useUser();

  const [answerContent, setAnswerContent] = useState("");

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
    <div className="w-full rounded-b-lg shadow-addanswer px-4 p-4 mt-4">
      <div className="flex justify-between items-center w-full">
        <img
          src={avatarUrl?.min}
          className="avatar-addanswer rounded-full object-cover"
        />
        <input
          placeholder="What do you think?"
          className="w-full border-b ml-2 border-gray-inputborder text-sm outline-none text-gray-addtext"
          value={answerContent}
          id={"content"}
          onChange={({ target }) => setAnswerContent(target.value)}
        />
        <button className="ml-2" onClick={() => saveDataAndAddAnswer()}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.643 8.15701L14.0803 1.62641C13.4183 1.05471 12.375 1.51881 12.375 2.40689V5.84667C5.47297 5.92569 0 7.30898 0 13.8499C0 16.49 1.70075 19.1054 3.58072 20.4728C4.16737 20.8995 5.00345 20.364 4.78715 19.6722C2.83877 13.4412 5.71128 11.787 12.375 11.6911V15.4687C12.375 16.3582 13.4191 16.8202 14.0803 16.2492L21.643 9.71798C22.1187 9.30711 22.1193 8.56844 21.643 8.15701Z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="11"
                y1="1.375"
                x2="11"
                y2="20.625"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9A86B5" />
                <stop offset="1" stopColor="#D3EEE6" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>
    </div>
  );
}
