import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserByUserId } from "../../../services/firebase";

export default function Header({ object }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUserObjByUserId() {
      const [user] = await getUserByUserId(object.userId);
      setUser(user);
    }
    if (object?.userId) {
      getUserObjByUserId();
    }
  }, []);

  return (
    <div className="font-fontbasic flex justify-between w-full border-b border-gray-border p-4 items-center">
      <div className="flex justify-between items-center">
        <Link
          to={`/p/${user ? user.username : null}`}
          className="flex items-center"
        >
          <img
            src={user ? user.avatarUrl.min : null}
            className="w-11 h-11 object-cover rounded-full"
          />
          <div className="leading-5 flex flex-col ml-3">
            <p className="text-sm font-medium text-primary">
              {user ? user.username : null}
            </p>
            <span className="text-xxs text-gray-base">Discussions</span>
          </div>
        </Link>
      </div>
      <p className="text-gray-date text-sm">{object.dateCreate}</p>
    </div>
  );
}
