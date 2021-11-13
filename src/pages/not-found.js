import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export default function NotFound() {
  useEffect(() => {
    document.title = "HAKO | Not found ";
  });
  return (
    <div className="flex font-fontbasic flex-col items-center bg-colors-gradient">
      <div className="flex items-center mt-28">
        <p className="font-semibold mr-5 text-9xl text-transparent bg-clip-text bg-gradient-to-br from-gradient-from to-gradient-to">
          404
        </p>
        <p className="uppercase w-72 font-extrabold text-3xl text-transparent bg-clip-text bg-gradient-to-br from-gradient-from to-gradient-to">
          it looks like you are facing a problem
        </p>
      </div>
      <p className="text-lg font-regular text-gray-light mt-0">
        This page does not exist, but you can go to the following:
      </p>
      <div className="flex mt-5 items-center justify-between max-w-xxs w-full">
        <Link
          className="text-xl font-semibold text-gradient-from border-btn p-1.5 px-4 rounded-lg hover:border-btn transition-all hover:bg-default-first hover:text-white duration-500transition-all hover:bg-default-first hover:text-white duration-500"
          to={ROUTES.DASHBOARD}
        >
          Home
        </Link>
        <Link
          className="bg-gradient-to-r p-2 px-4 text-xl font-semibold text-white rounded-xl demoGradient"
          to={ROUTES.LOGIN}
        >
          Log In
        </Link>
      </div>
    </div>
  );
}
