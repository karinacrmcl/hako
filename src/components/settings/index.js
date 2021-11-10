import React, { useContext, useState } from "react";
import Content from "./tabs";
import { useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import FirebaseContext from "../../context/firebase";
import { useModal } from "../../context/modal-context";
import { useMediaQuery } from "react-responsive";
import { MobileSettinsgInfo } from "./mobile/info";
import SvgSelector from "./svg-selector";
import { SettingsNavbar } from "./navbar";

export default function Settings() {
  const { openModal, setOpenModal } = useModal();
  const { firebase } = useContext(FirebaseContext);
  const isMobile = useMediaQuery({ maxWidth: "700px" });

  const history = useHistory();

  const [activeTab, setActiveTab] = useState("user-profile");

  return (
    <div className="font-fontbasic z-100 fixed w-screen h-screen top-0 bg-modal flex justify-center items-center ">
      <div className="bg-white shadow-xl h-contentSettings p-6 rounded-lg relative lptpXL:w-settingsMid lptpXS:w-settingsSmall lptpXS:h-settingsSmall settingsBP:w-full settingsBP:h-full">
        <div className="flex h-5/6 lptpXL:w-full">
          <div className="flex flex-col items-start settingsBP:w-full settingsBP:items-center ">
            {isMobile && <MobileSettinsgInfo />}
            <SettingsNavbar setActiveTab={setActiveTab} />
          </div>
          {!isMobile && (
            <div className="w-navborder h-full bg-gray-bordernav mr-4 settingsBP:bg-transparent"></div>
          )}

          {!isMobile && <Content category={activeTab} />}
        </div>

        <button
          className="absolute top-4 right-4"
          onClick={() => {
            setOpenModal({ ...openModal, ["modalSettings"]: false });
          }}
        >
          <SvgSelector id="close" />
        </button>
        <button
          className="text-base font-bold mt-6 settingsBP:mt-20 text-red-dark lptpXL:text-base lptpXS:text-sm "
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
  );
}
