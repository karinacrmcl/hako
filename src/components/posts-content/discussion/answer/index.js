import React, { useEffect, useState } from "react";
import SvgSelector from "../../svg-selector";
import { getUserByUserId } from "../../../../services/firebase";
import { Firebase } from "../../../../lib/firebase";
import { object } from "prop-types";

export function UserAnswer({ item, object }) {
  const { downVotes, upVotes } = item;
  const [user, setUser] = useState(null);
  const [voteValue, setVoteValue] = useState(null);

  useEffect(() => {
    async function getUserObjByUserId() {
      const [user] = await getUserByUserId(item.userAuthor);
      setUser(user);
    }
    if (item?.userAuthor) {
      getUserObjByUserId();
    }
  }, []);

  const handleVote = async (value) => {
    voteValue !== value ? setVoteValue(value) : setVoteValue(null);

    const doc = await Firebase.firestore()
      .collection("publications")
      .where("id", "==", object.id)
      .get();
    // .doc(object.docId)
    // .update({ upVotes: ["p"] });

    const result = doc.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }));

    const currentanswer = result[0].answers.filter((el) => el.id === item.id);
  };

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
            <button onClick={() => handleVote("up", item.id)} className="flex">
              {voteValue === "up" ? (
                <SvgSelector id="vote-up-active" />
              ) : (
                <SvgSelector id="vote-up" />
              )}
            </button>
            <p
              className={`text-xs ${
                voteValue == "up" ? "text-default-first" : "text-gray-link"
              } font-bold ml-1 select-none `}
            >
              {upVotes?.length}
            </p>
          </div>
          <div className="flex items-center">
            <button onClick={() => handleVote("down", item.id)}>
              {voteValue === "down" ? (
                <SvgSelector id="vote-down-active" />
              ) : (
                <SvgSelector id="vote-down" />
              )}
            </button>
            <p
              className={`text-xs ${
                voteValue == "down" ? "text-default-second" : "text-gray-link"
              } font-bold ml-1 select-none `}
            >
              {downVotes?.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
