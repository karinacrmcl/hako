import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import useUser from "../../../hooks/use-user";
import { useModal } from "../../../context/modal-context";

import * as ROUTES from "../../../constants/routes";

import FirebaseContext from "../../../context/firebase";
import SvgSelector from "../svg-selector";
import AddButton from "../add-button";

export function Links() {
  const { Firebase } = useContext(FirebaseContext);
  const history = useHistory();
  const {
    user: { username },
  } = useUser();

  const { openModal, setOpenModal } = useModal();

  function logOut() {
    Firebase.auth().signOut();
    history.push(ROUTES.LOGIN);
  }

  function openSettings() {
    setOpenModal({ ...openModal, ["modalSettings"]: true });
  }

  const links = [
    {
      to: ROUTES.DASHBOARD,
      label: "Home",
      icon: "home",
    },
    {
      to: `/p/${username}`,
      label: "Profile",
      icon: "user",
    },
  ];

  const buttons = [
    {
      func: logOut,
      label: "Log Out",
      icon: "logout",
    },
    {
      func: openSettings,
      label: "Settings",
      icon: "settings",
    },
  ];

  return (
    <div className="flex w-full justify-between lptpXS:items-center mobileXL:px-10 mobileXL:justify-center">
      <div className="flex lptpXS:justify-between lptpXS:items-center ">
        {links.map((item) => {
          return (
            <Link
              to={item.to}
              className="mr-2 ml-3 flex flex-col items-center lptpXS:mr-4 "
              key={item.label}
            >
              <SvgSelector id={item.icon} />

              <p className="text-xxs text-gray-menuButton ">{item.label}</p>
            </Link>
          );
        })}
      </div>
      <AddButton />
      <div className="flex w-80 justify-between lptpXS:items-center lptpXS:w-24 mobileXL:w-28">
        {buttons.map((item) => {
          return (
            <button
              type="button"
              key={item.label}
              className="flex flex-col items-center mobileXL:mr-2"
              onClick={() => {
                item.func();
              }}
            >
              <SvgSelector id={item.icon} />

              <p className="text-xxs text-gray-menuButton">{item.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
