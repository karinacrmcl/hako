import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { getUserByUserId } from "../../../services/firebase";
import { getMobileDate } from "../../../utils/get-mobile-date";

export default function Header({ object }) {
  const [user, setUser] = useState(null);
  const dateMobile = getMobileDate(object.displayDate);
  const isMobile = useMediaQuery({ maxWidth: "450px" });

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
    <div className="font-fontbasic flex justify-between w-full border-b border-gray-border p-4 lptpXS:p-3 items-center">
      <div className="flex justify-between items-center">
        <Link to={`/p/${user && user.username}`} className="flex items-center">
          <img
            src={user && user.avatarUrl.min}
            className="w-11 h-11 object-cover rounded-full lptpXS:w-9 lptpXS:h-9"
          />
          <div className="leading-5 flex flex-col ml-3">
            <p className="text-sm font-medium text-primary lptpXS:text-xs">
              {user && user.username}
            </p>
            <span className="text-xxs text-gray-base lptpXS:-mt-1">
              {object.category}
            </span>
          </div>
        </Link>
      </div>
      <p className="text-gray-date text-sm lptpXS:text-xs lptpXS:font-medium">
        {isMobile ? dateMobile : object.displayDate}
      </p>
    </div>
  );
}
