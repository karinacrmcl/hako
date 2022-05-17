import React, { useEffect, useState } from "react";
import SvgSelector from "../../svg-selector";
import AddAnswer from "../add-answer";
import { UserAnswer } from "../answer";

export default function Answers({ object }) {
  const [showDefault, setShowDefault] = useState(2);
  const [arrayDisplayed, setArrayDisplayed] = useState(false);
  const [answers, setAnswers] = useState(object.answers);

  function displayAnswers(array) {
    return array.slice(0, showDefault);
  }

  console.log("..", object);

  function isArrayDisplayed() {
    if (displayAnswers().length == answers.length) {
      setArrayDisplayed(true);
    } else {
      setArrayDisplayed(false);
    }
  }

  return (
    <div>
      {answers?.length === 0 ? (
        <p className="p-4 text-sm text-gray-extralight font-medium lptpXS:text-xs">
          No answers
        </p>
      ) : (
        displayAnswers(answers).map((item) => {
          return <UserAnswer key={item.id} item={item} object={object} />;
        })
      )}

      {object.answers.length === 0 || arrayDisplayed ? null : (
        <p
          className="text-base font-bold text-primary px-4 mt-2 cursor-pointer"
          onClick={() => {
            setShowDefault(showDefault + 3);
          }}
        >
          View more
        </p>
      )}
      <AddAnswer object={object} setAnswers={setAnswers} answers={answers} />
    </div>
  );
}
