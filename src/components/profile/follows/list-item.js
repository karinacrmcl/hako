import { Link } from "react-router-dom";

export function SingleUserInfo({ user }) {
  return (
    <>
      {user && (
        <Link
          to={`/p/${user ? user.username : null}`}
          className="flex justify-between mt-2 hover:bg-gray-background cursor-pointer px-4 py-1"
        >
          <div className="flex items-center">
            <img
              src={
                user
                  ? user.avatarUrl.min
                  : "https://i.ibb.co/ZY5mytK/user-deleted.png"
              }
              className="avatar-list rounded-full object-cover"
            />
            <p className="text-sm font-medium ml-2">{user.username}</p>
          </div>
        </Link>
      )}
    </>
  );
}
