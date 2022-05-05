import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { dateOptions } from "../../../constants/date-options";
import { addPublication } from "../../../services/firebase";
import Base from "../layout";
import PublicationSuccess from "../publication-success/";

export default function AddDiscussion({ user }) {
  const [isPublished, setIsPublished] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const post = {
      category: "Discussions ",
      displayDate: new Date().toLocaleDateString("en-US", dateOptions),
      id: new Date().getTime().toString(),
      dateCreated: new Date(),
      question: data.question,
      opinion: data.opinion,
      type: "discussion",
      userId: user.uid,
      answers: [],
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
        category="Discussion"
        categoryKey="modalAddDiscussion"
        onPostHandler={handleSubmit(onSubmit)}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex-col flex h-full py-10 relative lptpXL:py-5 lptpXL:w-full"
        >
          <input
            className={`input-add ${errors.question && "input-error"}`}
            placeholder="Main question/topic.."
            type="text"
            id="question"
            name="question"
            {...register("question", {
              validate: (value) => value.length > 50,
            })}
          />
          {errors.question && (
            <p className="text-sm ml-2 mt-2 text-gray-light">
              Your question is too short
            </p>
          )}

          <textarea
            className={`textarea-add mt-6 h-96 ${
              errors.opinion && "textarea-error"
            }`}
            placeholder="What’s on your mind?"
            {...register("opinion", {
              validate: (value) => value.length > 100,
            })}
          ></textarea>
          {errors.opinion && (
            <p className="text-sm ml-2 mt-2 text-gray-light">
              Elaborate your opinion
            </p>
          )}
        </form>
        <PublicationSuccess isPublished={isPublished} />
      </Base>
    </>
  );
}
