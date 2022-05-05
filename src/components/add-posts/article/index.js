import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { dateOptions } from "../../../constants/date-options";
import { addPublication } from "../../../services/firebase";
import Base from "../layout";
import PublicationSuccess from "../publication-success/";

export default function AddArticle({ user }) {
  const [isPublished, setIsPublished] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const post = {
      category: "Posts & Articles",
      displayDate: new Date().toLocaleDateString("en-US", dateOptions),
      id: new Date().getTime().toString(),
      dateCreated: new Date(),
      title: data.title,
      text: data.text,
      type: "article",
      userId: user.uid,
      comments: [],
    };
    reset();
    setIsPublished(true);
    setTimeout(() => {
      setIsPublished(false);
    }, 3000);
    addPublication(post);
  };

  return (
    <>
      <Base
        category="Article"
        categoryKey="modalAddArticle"
        onPostHandler={handleSubmit(onSubmit)}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex-col flex h-full py-10 relative lptpXL:py-5 lptpXL:w-full"
        >
          <input
            className={`input-add ${errors.title && "input-error"}`}
            placeholder="Title of the post"
            type="text"
            id="title"
            name="title"
            {...register("title", {
              validate: (value) => value.length > 10 && value.length < 120,
            })}
          />
          {errors.title && (
            <p className="text-sm ml-2 mt-2 text-gray-light">
              Title should be at least 10 characters long
            </p>
          )}

          <textarea
            className={`textarea-add mt-6 h-96 ${
              errors.title && "textarea-error"
            }`}
            placeholder="What’s on your mind?"
            {...register("text", {
              validate: (value) => value.length > 100 && value.length < 1500,
            })}
          ></textarea>
          {errors.text && (
            <p className="text-sm ml-2 mt-2 text-gray-light">
              Text should be at least 100 characters long
            </p>
          )}
        </form>
        <PublicationSuccess isPublished={isPublished} />
      </Base>
    </>
  );
}
