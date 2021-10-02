import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { getUserByUserId } from "../../../services/firebase";
import { SingleUserInfo } from "./list-item";

export default function FollowerList({ list }) {
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
  }, []);

  return (
    <div className="userinfo-modal absolute mt-4 ml-60 z-100 overflow-auto flex flex-col">
      {users.length > 0 ? (
        users.sort().map((item) => {
          if (item) {
            return <SingleUserInfo user={item} key={item.userId} />;
          } else {
            let id =
              new Date().getTime().toString() + Math.round(Math.random() * 100);
            return (
              <div className="flex justify-between mt-2" key={id}>
                <div className="flex items-center">
                  <img
                    src="https://i.ibb.co/ZY5mytK/user-deleted.png"
                    className="avatar-list rounded-full object-cover"
                  />
                  <p className="text-sm font-medium ml-2">Deleted User</p>
                </div>
              </div>
            );
          }
        })
      ) : (
        <Loader type="ThreeDots" color="#9A86B5" height={20} width={20} />
      )}
    </div>
  );
}
