import React, { useContext, useState } from "react";
import UserContext from "../../../context/user";
import useUser from "../../../hooks/use-user";
import { addAnswerToDiscussion } from "../../../services/firebase";

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
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6754 7.41546L12.8003 1.47855C12.1985 0.958824 11.25 1.38074 11.25 2.18808V5.31515C4.97543 5.38699 0 6.64453 0 12.5909C0 14.9909 1.54613 17.3685 3.2552 18.6116C3.78852 18.9996 4.54859 18.5127 4.35195 17.8839C2.5807 12.2193 5.19207 10.7155 11.25 10.6283V14.0625C11.25 14.8711 12.1992 15.2911 12.8003 14.772L19.6754 8.83453C20.1079 8.46101 20.1085 7.78949 19.6754 7.41546Z"
                fill="url(#paint0_linear_166:367)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_166:367"
                  x1="10"
                  y1="1.25"
                  x2="10"
                  y2="18.75"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9A86B5" />
                  <stop offset="1" stopColor="#D3EEE6" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.6754 7.41546L12.8003 1.47855C12.1985 0.958824 11.25 1.38074 11.25 2.18808V5.31515C4.97543 5.38699 0 6.64453 0 12.5909C0 14.9909 1.54613 17.3685 3.2552 18.6116C3.78852 18.9996 4.54859 18.5127 4.35195 17.8839C2.5807 12.2193 5.19207 10.7155 11.25 10.6283V14.0625C11.25 14.8711 12.1992 15.2911 12.8003 14.772L19.6754 8.83453C20.1079 8.46101 20.1085 7.78949 19.6754 7.41546Z"
                fill="#EBEBEB"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
