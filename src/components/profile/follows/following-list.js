import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getUserByUserId } from "../../../services/firebase";
import { SingleUserInfo } from "./list-item";

export default function FollowingList({ list }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    function getUserObjByUserId() {
      list.map(async (id) => {
        const [user] = await getUserByUserId(id);
        setUsers((users) => [...users, user]);
      });
    }
    if (list) {
      getUserObjByUserId();
    }
  }, [list]);

  return (
    <div className="userinfo-modal absolute mt-4 ml-60 z-100 overflow-auto  flex flex-col">
      {users.length > 0 ? (
        users.sort().map((item) => {
          return <SingleUserInfo user={item} key={item.userId} />;
        })
      ) : (
        <Loader type="ThreeDots" color="#9A86B5" height={20} width={20} />
      )}
    </div>
  );
}
