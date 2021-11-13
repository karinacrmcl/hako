import React, { useState } from "react";
import { addPublication } from "../../../services/firebase";
import PublicationSuccess from "../publication-success/";
import ButtonSecond from "../../../shared/button-2";

export default function Content({ user }) {
  const [question, setQuestion] = useState("");
  const [opinion, setOpinion] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  function savePostData() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (question && opinion) {
      //post article proto
      const post = {
        category: "Discussions ",
        dateCreate: new Date().toLocaleDateString("en-US", options),
        id: new Date().getTime().toString(),
        question,
        opinion,
        type: "discussion",
        userId: user.uid,
        answers: [],
      };

      addPublication(post);

      //add to db and clean fields
      setQuestion("");
      setOpinion("");
      //remove optional styles
      document.querySelectorAll(".input-add").forEach((item) => {
        item.classList.remove("input-error");
      });
      document.querySelectorAll(".textarea-add").forEach((item) => {
        item.classList.remove("textarea-error");
      });

      //show modal with success
      setIsPublished(true);
      setTimeout(() => {
        setIsPublished(false);
      }, 3000);
    } else {
      document.querySelectorAll(".input-add").forEach((item) => {
        if (item.value == "") {
          item.classList.add("input-error");
        }
      });
      document.querySelectorAll(".textarea-add").forEach((item) => {
        if (item.value == "") {
          item.classList.add("textarea-error");
        }
      });
    }
  }

  return (
    <div className="flex-col flex h-full py-10 relative">
      <input
        className="input-add"
        placeholder="Main question/topic.."
        value={question}
        onChange={({ target }) => {
          setQuestion(target.value);
        }}
      ></input>
      <textarea
        className="textarea-add mt-6 h-96"
        placeholder="Your opinion.."
        value={opinion}
        onChange={({ target }) => {
          setOpinion(target.value);
        }}
      ></textarea>
      <div
        className="absolute right-0 -bottom-10"
        onClick={(e) => savePostData(e)}
      >
        <ButtonSecond />
      </div>
      <PublicationSuccess isPublished={isPublished} />
    </div>
  );
}
