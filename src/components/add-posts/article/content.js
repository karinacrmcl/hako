import React, { useState, useContext, useEffect } from "react";
import { addPublication, getUserByUsername } from "../../../services/firebase";
import PublicationSuccess from "../publication-success/";
import { setTimeout } from "timers";
import ButtonSecond from "../../../shared/button-2";

export default function Content({ user }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // const [user, setUser] = useState(null);

  function savePostData() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (title && text) {
      //post article proto
      const post = {
        category: "Posts & Articles",
        dateCreate: new Date().toLocaleDateString("en-US", options),
        id: new Date().getTime().toString(),
        title,
        text,
        type: "article",
        userId: user.uid,
        comments: [],
      };

      //add to db and clean fields
      addPublication(post);
      setTitle("");
      setText("");

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

  const handleLogin = async (event) => {
    event.preventDefault();
  };

  return (
    <form
      key={"form"}
      className="flex-col flex h-full py-10 relative"
      onSubmit={handleLogin}
      method="POST"
    >
      <input
        className="input-add"
        placeholder="Title of the post"
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={({ target }) => {
          setTitle(target.value);
        }}
      />
      <textarea
        className="textarea-add mt-6 h-96"
        value={text}
        placeholder="What’s on your mind?"
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></textarea>
      <div
        className="absolute right-0 -bottom-10"
        onClick={(e) => savePostData(e)}
      >
        <ButtonSecond />
      </div>

      <PublicationSuccess isPublished={isPublished} />
    </form>
  );
}
