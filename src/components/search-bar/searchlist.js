import React from "react";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

export default function SearchList({ users }) {
  return (
    <div className="h-auto flex flex-col bg-white shadow-xl w-96 absolute z-100 top-12 rounded-lg -left-8 searchlist lptpXS:w-80 lptpXS:-left-4 mobileSM:60 mobileSM:-left-10 mobileSM:mt-1 ">
      {users.length === 0 ? (
        <p className="text-black-light font-medium p-2 lptpXS:text-sm">
          {" "}
          Nothing found{" "}
        </p>
      ) : users ? (
        users.map((user) => {
          return (
            <Link
              to={`/p/${user.username}`}
              key={user.userId}
              className="flex hover:bg-gray-background cursor-pointer px-2 py-3 lptpXS:px-1 lptpXS:py-2"
            >
              <img
                src={user.avatarUrl.min}
                className="w-12 rounded-full lptpXS:w-10"
              />
              <div className="flex flex-col ml-2">
                <p className="font-semibold lptpXS:text-sm">{user.username}</p>
                <p className="text-sm lptpXS:text-xs">{user.fullName}</p>
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
