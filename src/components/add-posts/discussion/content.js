import React, { useState } from "react";
import { addPublication } from "../../../services/firebase";
import ButtonFilled from "../../../shared/components/button-filled";
import PublicationSuccess from "../publication-success/";
import SymbolsLimit from "../symbols-limit";

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

      setQuestion("");
      setOpinion("");
      document.querySelectorAll(".input-add").forEach((item) => {
        item.classList.remove("input-error");
      });
      document.querySelectorAll(".textarea-add").forEach((item) => {
        item.classList.remove("textarea-error");
      });

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
      <SymbolsLimit length={opinion.length} limit={symbolsLimit} />

      <PublicationSuccess isPublished={isPublished} />
    </div>
  );
}
