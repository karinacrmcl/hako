import React, { useContext, useState } from "react";
import CloseBtn from "./closebtn";
import Content from "./content";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import UserContext from "../../context/user";
import useUser from "../../hooks/use-user";
import FirebaseContext from "../../context/firebase";
import { useModal } from "../../hooks/use-modal";

export default function Settings({ user }) {
  const { openModal, setOpenModal } = useModal();

  const settingsTabs = [
    {
      identifier: "user-profile",
      title: "User profile",
      icon: "/images/icons/settings/user-profile.svg",
    },
    {
      identifier: "customization",
      title: "Customization",
      icon: "/images/icons/settings/customization.svg",
    },
    {
      identifier: "privacy",
      title: "Privacy",
      icon: "/images/icons/settings/privacy.svg",
    },
    {
      identifier: "help",
      title: "Help",
      icon: "/images/icons/settings/help.svg",
    },
    {
      identifier: "about",
      title: "About",
      icon: "/images/icons/settings/info.svg",
    },
  ];
  const [activeTab, setActiveTab] = useState("user-profile");

  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  return (
    <div className="font-fontbasic z-100 fixed w-screen h-screen top-0 bg-modal flex justify-center items-center">
      <div className="bg-white shadow-xl h-contentSettings p-6 rounded-lg relative">
        <div className="flex h-5/6 ">
          <div className="flex flex-col items-start ">
            {settingsTabs.map((tab) => {
              return (
                <div
                  className="flex items-center w-60 h-12 cursor-pointer settings-tab relative"
                  id={tab.identifier}
                  key={tab.identifier}
                  onClick={() => {
                    setActiveTab(tab.identifier);
                  }}
                >
                  <img src={tab.icon} alt={tab.title} className="mr-2 mb-1" />
                  <p className="text-lg w-full">{tab.title} </p>
                </div>
              );
            })}
          </div>
          <div className="w-navborder h-full bg-gray-bordernav mr-4"></div>
          <Content category={activeTab} />
        </div>

        <CloseBtn />
        <div className="flex w-full justify-between items-center mt-6">
          <button
            className="text-base font-bold text-red-dark "
            onClick={() => {
              firebase.auth().signOut();
              history?.push(ROUTES.LOGIN);
              setOpenModal({ ...openModal, ["modalSettings"]: false });
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
