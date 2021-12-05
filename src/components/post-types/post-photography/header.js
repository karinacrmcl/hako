import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
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

  const isMobile = useMediaQuery({ maxWidth: "450px" });
  const dateMobile = `${object.dateCreate
    .split(" ")[0]
    .split("")
    .slice(0, 3)
    .join("")}, ${object.dateCreate
    .split(" ")[1]
    .split("")
    .slice(0, 3)
    .join("")}, ${object.dateCreate.split(" ")[2].replace(",", "")}`;

  return (
    <div className="font-fontbasic flex justify-between w-full border-b border-gray-border p-4 lptpXS:p-3 items-center">
      <div className="flex justify-between items-center">
        <Link
          to={`/p/${user ? user.username : null}`}
          className="flex items-center"
        >
          <img
            src={user ? user.avatarUrl.min : null}
            className="w-11 h-11 object-cover rounded-full lptpXS:w-9 lptpXS:h-9"
          />
          <div className="leading-5 flex flex-col ml-3">
            <p className="text-sm font-medium text-primary lptpXS:text-xs">
              {user ? user.username : null}
            </p>
            <span className="text-xxs text-gray-base lptpXS:-mt-1">
              Photography
            </span>
          </div>
        </Link>
      </div>
      <p className="text-gray-date text-sm lptpXS:text-xs lptpXS:font-medium">
        {isMobile ? dateMobile : object.dateCreate}
      </p>
    </div>
  );
}
