import React from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function SearchList({ users }) {
  return (
    <div className="h-auto flex flex-col bg-white shadow-xl w-96 absolute z-100 top-12 rounded-lg -left-8 searchlist">
      {users.length === 0 ? (
        <p className="text-black-light font-medium p-2"> Nothing found </p>
      ) : users ? (
        users.map((user) => {
          return (
            <Link
              to={`/p/${user.username}`}
              key={user.userId}
              className="flex hover:bg-gray-background cursor-pointer px-2 py-3"
            >
              <img src={user.avatarUrl.min} className="w-12 rounded-full" />
              <div className="flex flex-col ml-2">
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm">{user.fullName}</p>
              </div>
            </Link>
          );
        })
      ) : (
        <Loader type="ThreeDots" color="#9A86B5" height={20} width={20} />
      )}
    </div>
  );
}
