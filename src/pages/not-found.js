import { useEffect } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import ButtonFilled from "../shared/components/button-filled";
import ButtonUnfilled from "../shared/components/button-unfilled";

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
      <div className="flex mt-5 h-10 items-center justify-between w-48">
        <Link to={ROUTES.DASHBOARD} className="h-8">
          <ButtonUnfilled>Home</ButtonUnfilled>
        </Link>
        <Link to={ROUTES.LOGIN} className="h-8">
          <ButtonFilled>Log In</ButtonFilled>
        </Link>
      </div>
    </div>
  );
}
