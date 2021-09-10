import React, { useState } from "react";
import { addPublication } from "../../../services/firebase";
import ButtonFilled from "../../../shared/components/button-filled";
import PublicationSuccess from "../publication-success/";

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

    if (question && opinion && opinion.length <= symbolsLimit) {
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
  const symbolsLimit = 800;

  return (
    <div className="flex-col flex h-full py-10 relative lptpXL:py-5">
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
      <p
        className={`flex justify-end mt-1 lptpXL:text-sm ${
          opinion.length <= symbolsLimit
            ? `text-gray-extralight`
            : `text-red-primary`
        }`}
      >
        {opinion.length}/{symbolsLimit}
      </p>
      <div
        className="absolute right-0 -bottom-10 tabletXL:-top-12 tabletXL:bottom-auto mobileXL:-top-9"
        onClick={(e) => savePostData(e)}
      >
        <ButtonFilled />
      </div>
      <PublicationSuccess isPublished={isPublished} />
    </div>
  );
}
