import React from "react";
import { useMediaQuery } from "react-responsive";
import { useModal } from "../../../context/modal-context";
import { settingsTabs } from "../../../constants/settings-tabs";
import SvgSelector from "../svg-selector";

export function SettingsNavbar({ setActiveTab }) {
  const { openModal, setOpenModal } = useModal();
  const isMobile = useMediaQuery({ maxWidth: "700px" });

  return (
    <>
      {settingsTabs.map((tab) => {
        return (
          <div
            className={`flex items-center w-60 h-12 cursor-pointer settings-tab relative lptpXL:w-48 lptpXS:w-36 lptpXS:h-9 settingsBP:w-full settingsBP:mt-1 ${
              isMobile ? (tab.hiddenMobile ? "hidden" : "display-block") : null
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

            {isMobile && (
              <button>
                <SvgSelector id="mobile-arrow" />
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}
