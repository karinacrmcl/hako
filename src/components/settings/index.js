import React, { useContext, useState } from "react";
import CloseBtn from "./closebtn";
import Content from "./content";
import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import UserContext from "../../context/user";
import useUser from "../../hooks/use-user";
import FirebaseContext from "../../context/firebase";
import { useModal } from "../../hooks/use-modal";
import { useMediaQuery } from "react-responsive";
import Skeleton from "react-loading-skeleton";

export default function Settings({ user }) {
  const { openModal, setOpenModal } = useModal();
  const isMobile = useMediaQuery({ maxWidth: "700px" });

  const settingsTabs = [
    {
      identifier: "user-profile",
      title: "User profile",
      iconDesktop: "/images/icons/settings/desktop/user-profile.svg",
      iconMobile: "/images/icons/settings/mobile/user-profile.svg",
      hiddenMobile: true,
    },
    {
      identifier: "customization",
      title: "Customization",
      iconDesktop: "/images/icons/settings/desktop/customization.svg",
      iconMobile: "/images/icons/settings/mobile/customization.svg",
      hiddenMobile: false,
      modalTag: "settingsCustomizationMobile",
    },
    {
      identifier: "privacy",
      title: "Privacy",
      iconDesktop: "/images/icons/settings/desktop/privacy.svg",
      iconMobile: "/images/icons/settings/mobile/privacy.svg",
      hiddenMobile: false,
      modalTag: "settingsPrivacyMobile",
    },
    {
      identifier: "help",
      title: "Help",
      iconDesktop: "/images/icons/settings/desktop/help.svg",
      iconMobile: "/images/icons/settings/mobile/help.svg",
      hiddenMobile: false,
      modalTag: "settingsHelpMobile",
    },
    {
      identifier: "about",
      title: "About",
      iconDesktop: "/images/icons/settings/desktop/info.svg",
      iconMobile: "/images/icons/settings/mobile/info.svg",
      hiddenMobile: false,
      modalTag: "settingsAboutMobile",
    },
  ];
  const [activeTab, setActiveTab] = useState("user-profile");

  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  const {
    user: { fullName, avatarUrl, emailAdress },
  } = useUser();

  const MobileSettinsgInfo = () => {
    return (
      <div className="w-full flex flex-col items-center">
        {avatarUrl ? (
          <img
            src={avatarUrl?.min}
            className="w-24 object-cover rounded-full"
          />
        ) : (
          <Skeleton width={40} height={40} />
        )}

        <p className="text-base font-medium mt-1">{fullName} </p>
        <p className="text-sm font-medium text-gray-base mt-0">{emailAdress}</p>
        <button
          onClick={() => {
            setOpenModal({
              ...openModal,
              ["settingsUserProfileMobile"]: true,
            });
          }}
          className="rounded-full bg-default-first py-1 px-2 text-sm text-white font-medium mt-3 mb-4 flex items-center"
        >
          Edit Profile
          <svg
            width="8"
            height="13"
            viewBox="0 0 10 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2"
          >
            <path
              d="M8.96289 7.44243L2.46074 1.05672C2.14725 0.748835 1.63873 0.748835 1.32524 1.05672L0.566798 1.80162C0.253651 2.10917 0.253317 2.60731 0.56546 2.91552L5.71867 8.00004L0.565794 13.0849C0.253317 13.3931 0.253985 13.8912 0.567133 14.1988L1.32558 14.9437C1.63906 15.2516 2.14759 15.2516 2.46107 14.9437L8.96289 8.55765C9.27637 8.24976 9.27637 7.75031 8.96289 7.44243Z"
              fill="#ffff"
            />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="font-fontbasic z-100 fixed w-screen h-screen top-0 bg-modal flex justify-center items-center ">
      <div className="bg-white shadow-xl h-contentSettings p-6 rounded-lg relative lptpXL:w-settingsMid lptpXS:w-settingsSmall lptpXS:h-settingsSmall settingsBP:w-full settingsBP:h-full">
        <div className="flex h-5/6 lptpXL:w-full">
          <div className="flex flex-col items-start settingsBP:w-full settingsBP:items-center ">
            {isMobile ? <MobileSettinsgInfo /> : null}
            {settingsTabs.map((tab) => {
              return (
                <div
                  className={`flex items-center w-60 h-12 cursor-pointer settings-tab relative lptpXL:w-48 lptpXS:w-36 lptpXS:h-9 settingsBP:w-full settingsBP:mt-1 ${
                    isMobile
                      ? tab.hiddenMobile
                        ? "hidden"
                        : "display-block"
                      : null
                  }`}
                  id={tab.identifier}
                  key={tab.identifier}
                  onClick={() => {
                    if (isMobile) {
                      setOpenModal({
                        ...openModal,
                        [tab.modalTag]: true,
                      });
                    } else {
                      setActiveTab(tab.identifier);
                    }
                  }}
                >
                  <img
                    src={isMobile ? tab.iconMobile : tab.iconDesktop}
                    alt={tab.title}
                    className="mr-2 mb-1 lptpXS:w-6 "
                  />
                  <p className="text-lg w-full lptpXL:text-base lptpXS:text-sm settingsBP:font-medium">
                    {tab.title}
                  </p>

                  {isMobile ? (
                    <button>
                      <img src="/images/icons/settings/mobile/arrow.svg"></img>
                    </button>
                  ) : null}
                </div>
              );
            })}
          </div>
          {isMobile ? null : (
            <div className="w-navborder h-full bg-gray-bordernav mr-4 settingsBP:bg-transparent"></div>
          )}

          {isMobile ? null : <Content category={activeTab} />}
        </div>

        <CloseBtn />
        <div className="flex w-full justify-between items-center mt-6 settingsBP:mt-20">
          <button
            className="text-base font-bold text-red-dark lptpXL:text-base lptpXS:text-sm "
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
