import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useModal } from "../../../../context/modal-context";
import ButtonFilled from "../../../../shared/components/button-filled";

export default function Customization() {
  const isMobile = useMediaQuery({ maxWidth: "700px" });

  const [themeActive, setThemeActive] = useState("lightTheme");
  const [fontActive, setFontActive] = useState("fontNormal");

  const { openModal, setOpenModal } = useModal();

  return (
    <div className="flex flex-col ml-4 w-contentSettings h-full settingsBP:items-center settingsBP:w-full settingsBP:mt-4 settingsBP:ml-0  ">
      <h2 className="text-xl font-medium lptpXS:text-lg">Theme</h2>

      {isMobile && (
        <div className="flex self-end mt-auto -mb-12 lptpXL:-mr-20 lptpXS:mr-0 settingsBP:absolute left-4 top-4">
          <button
            onClick={() => {
              setOpenModal({
                ...openModal,
                ["settingsUserProfileMobile"]: false,
              });
            }}
          ></button>
        </div>
      )}
    </div>
  );
}
