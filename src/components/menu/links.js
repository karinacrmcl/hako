import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import UserContext from "../../context/user";
import useUser from "../../hooks/use-user";
import AddButton from "./add-button";
import FirebaseContext from "../../context/firebase";
import { useModal } from "../../hooks/use-modal";

export function Links() {
  const { user } = useContext(UserContext);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const {
    user: { fullName },
  } = useUser();

  const { openModal, setOpenModal } = useModal();
  return (
    <div className="flex w-full justify-between ">
      <div className="flex">
        <Link
          to={ROUTES.DASHBOARD}
          className="mr-6 flex flex-col  items-center"
        >
          <img src="/images/icons/menu/home.svg" className="h-5 w-5" />
          <p className="text-xxs text-gray-link">Home</p>
        </Link>
        <Link
          to={`/p/${user.displayName}`}
          className=" flex flex-col items-center mr-2"
        >
          <img src="/images/icons/menu/user.svg" className="h-5 w-5" />
          <p className="text-xxs text-gray-link">Profile</p>
        </Link>
      </div>
      <AddButton />
      <div className="flex w-full justify-between">
        <button
          type="button"
          title="Sign Out"
          className="flex flex-col items-center"
          onClick={() => {
            firebase.auth().signOut();
            history.push(ROUTES.LOGIN);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              firebase.auth().signOut();
              history.push(ROUTES.LOGIN);
            }
          }}
        >
          <img src="/images/icons/menu/log-out.svg" className="h-5 w-5" />
          <p className="text-xxs text-gray-link">Log Out</p>
        </button>

        <button
          className=" flex flex-col items-center"
          onClick={() => {
            setOpenModal({ ...openModal, ["modalSettings"]: true });
          }}
        >
          <img src="/images/icons/menu/settings.svg" className="h-5 w-5" />
          <p className="text-xxs text-gray-link">Settings</p>
        </button>
      </div>
    </div>
  );
}
