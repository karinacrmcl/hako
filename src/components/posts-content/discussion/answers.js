import React, { useEffect, useState } from "react";
import useUser from "../../../hooks/use-user";
import AddAnswer from "./add-answer";

export default function Answers({ object, currentUserId }) {
  const [showDefault, setShowDefault] = useState(2);
  const [arrayDisplayed, setArrayDisplayed] = useState(false);
  const [answers, setAnswers] = useState(object.answers);

  function displayAnswers(array) {
    return array.slice(0, showDefault);
  }

  function isArrayDisplayed() {
    if (displayAnswers().length == answers.length) {
      setArrayDisplayed(true);
    } else {
      setArrayDisplayed(false);
    }
  }

  const UserAnswer = ({ item }) => {
    const [user, setUser] = useState(null);

    function handleVote(value, answerId) {
      if (vote == value) {
        setVote("not selected");
      } else {
        setVote(value);
      }
    }

    const [vote, setVote] = useState("not selected");
    const [downVotes, setDownVotes] = useState([]);
    const [upVotes, setUpVotes] = useState([]);

    useEffect(() => {
      if (vote == "up") {
        setUpVotes((upVotes) => [
          ...upVotes,
          {
            id: user.userId,
          },
        ]);
        setDownVotes(downVotes.filter((item) => item.id !== user.userId));
        // toggleVote(object, item);
      } else {
        setUpVotes(upVotes.filter((item) => item.id !== user.userId));
      }

      if (vote == "down") {
        setDownVotes((downVotes) => [
          ...downVotes,
          {
            id: user.userId,
          },
        ]);
        setUpVotes(upVotes.filter((item) => item.id !== user.userId));
      } else {
        setDownVotes(downVotes.filter((item) => item.id !== user.userId));
      }
    }, [vote]);

    useEffect(() => {
      function setVotes() {
        setDownVotes(item.downVotes);
        setUpVotes(item.upVotes);
      }
      if (item) {
        setVotes();
      }
    }, []);

    return (
      <div className="flex justify-between items-start mt-4 px-4">
        <img
          src={user?.avatarUrl.min}
          className="mr-2 avatar-answers rounded-full object-cover"
        />
        <div className="flex flex-col items-start w-full">
          <h3 className="text-sm font-semibold"> {user?.username}</h3>
          <p className="text-sm text-contentbreaks">{item.content}</p>
          <div className="flex items-center mt-1 w-16 justify-between">
            <div className="flex items-center">
              <button
                onClick={() => handleVote("up", item.id)}
                className="flex"
              >
                <svg
                  width="12"
                  height="15"
                  viewBox="0 0 9 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="-mt-0.5"
                >
                  <path
                    d="M3.74306 1.87676L1.17594 4.85026C1.10699 4.93012 1.16373 5.05405 1.26923 5.05405H1.61538C2.16767 5.05405 2.61538 5.50177 2.61538 6.05405V10C2.61538 10.5523 3.0631 11 3.61538 11H5.38462C5.9369 11 6.38462 10.5523 6.38462 10V6.05405C6.38462 5.50177 6.83233 5.05405 7.38462 5.05405H7.73077C7.83627 5.05405 7.89301 4.93012 7.82406 4.85026L5.25694 1.87676C4.85806 1.41474 4.14194 1.41475 3.74306 1.87676Z"
                    stroke={vote == "up" ? "#9A86B5" : "#D8D8D8"}
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <p
                className={`text-xs ${
                  vote == "up" ? "text-default-first" : "text-gray-link"
                } font-bold ml-1 select-none `}
              >
                {upVotes?.length}
              </p>
            </div>
            <div className="flex items-center">
              <button onClick={() => handleVote("down", item.id)}>
                <svg
                  width="12"
                  height="15"
                  viewBox="0 0 9 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.25694 10.1232L7.82406 7.14974C7.89301 7.06988 7.83627 6.94595 7.73077 6.94595L7.38462 6.94595C6.83233 6.94595 6.38462 6.49823 6.38462 5.94595L6.38462 2C6.38462 1.44772 5.9369 1 5.38462 1L3.61538 1C3.0631 1 2.61538 1.44772 2.61538 2L2.61538 5.94595C2.61538 6.49823 2.16767 6.94595 1.61538 6.94595L1.26923 6.94595C1.16373 6.94595 1.10699 7.06988 1.17594 7.14974L3.74306 10.1232C4.14194 10.5853 4.85806 10.5853 5.25694 10.1232Z"
                    stroke={vote == "down" ? "#CDE2E0" : "#D8D8D8"}
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <p
                className={`text-xs ${
                  vote == "down" ? "text-default-second" : "text-gray-link"
                } font-bold ml-1 select-none `}
              >
                {downVotes?.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {answers?.length === 0 ? (
        <p className="p-4 text-sm text-gray-extralight font-medium lptpXS:text-xs">
          No answers
        </p>
      ) : (
        displayAnswers(answers).map((item) => {
          return <UserAnswer key={item.id} item={item} />;
        })
      )}

      {object.answers.length === 0 || arrayDisplayed ? null : (
        <p
          className="text-base font-bold text-primary px-4 mt-2 cursor-pointer"
          onClick={() => {
            setShowDefault(showDefault + 3);
            // isArrayDisplayed();
          }}
        >
          View more
        </p>
      )}
      <AddAnswer object={object} setAnswers={setAnswers} answers={answers} />
    </div>
  );
}
