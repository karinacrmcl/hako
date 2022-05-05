import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserByUserId } from "../../../services/firebase";

export const UserComment = ({ item }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUserObjByUserId() {
      const [user] = await getUserByUserId(item.userId);
      setUser(user);
    }
    if (item?.userId) {
      getUserObjByUserId();
    }
  }, []);

  return (
    <div
      key={`${item.comment} - ${user?.username}`}
      className="mb-1 flex lptpXS:mb-0.5 lptpXS:items-center"
    >
      <img
        className="w-10 h-10 mr-2 rounded-full lptpXS:w-8 lptpXS:h-8 "
        src={user?.avatarUrl.min}
      />
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col justify-start ml-2 lptpXS:p-0">
          <Link to={`/p/${user?.username}`} className="lptpXS:-mt-0.5">
            <span className=" font-bold text-sm lptpXS:text-xs lptpXS:mb-0">
              {user?.username}
            </span>
          </Link>
          <span className=" text-sm text-contentbreaks lptpXS:text-xs lptpXS:-mt-1">
            {item.comment}
          </span>
        </div>
        <p className="text-xs w-28 w-datecreate flex justify-end text-gray-light lptpXS:text-xxs">
          {item.displayDate}
        </p>
      </div>
    </div>
  );
};
