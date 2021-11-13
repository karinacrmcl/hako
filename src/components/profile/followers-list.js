import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { getUserByUserId } from "../../services/firebase";

export default function FollowerList({ list }) {
  const [users, setUsers] = useState([]);
  // ---------------------------------------
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

  const SingleUserInfo = ({ user }) => {
    return (
      <>
        {user ? (
          <div className="flex justify-between mt-2">
            <Link
              to={`/p/${user ? user.username : null}`}
              className="flex items-center"
            >
              <div className="flex items-center">
                <img
                  src={user ? user.avatarUrl.min : null}
                  className="avatar-list rounded-full object-cover"
                />
                <p className="text-sm font-medium ml-2">{user.username}</p>
              </div>
            </Link>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div className="userinfo-modal absolute -right-4 top-48 z-100 overflow-auto px-4 py-2 flex flex-col">
      {users.length > 0 ? (
        users.sort().map((item) => {
          if (item) {
            // console.log(item);
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
