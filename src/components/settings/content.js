import React from "react";
import { useEffect } from "react/cjs/react.development";
import { useContext, useState } from "react";

import useUser from "../../hooks/use-user";
import { updateProfiledata } from "../../services/firebase";
import { firebase } from "../../lib/firebase";

import Field from "./field";
import StateUpdating from "./state-updating";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Skeleton from "react-loading-skeleton";
import { doesUsernameExist } from "../../services/firebase";
import { useModal } from "../../hooks/use-modal";
import { useMediaQuery } from "react-responsive";

export default function Content({ category }) {
  const { user } = useUser();

  // ----------------------- responsive -------------------------------
  const { openModal, setOpenModal } = useModal();
  const isMobile = useMediaQuery({ maxWidth: "700px" });

  // ----------------------- buttons ----------------------------------

  const SaveButton = ({ func }) => {
    return (
      <button
        onClick={func}
        className="bg-gradient-to-r p-1 px-4 demoGradient text-xl font-semibold text-white rounded-lg transition-all lptpXS:px-3 lptpXL:text-base lptpXS:text-sm"
      >
        Save
      </button>
    );
  };

  const CloseButton = ({ func }) => {
    return (
      <button onClick={func} className=" transition-all p-1">
        <svg
          width="12"
          height="18"
          viewBox="0 0 12 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.03711 8.44237L8.53926 2.05666C8.85275 1.74877 9.36127 1.74877 9.67476 2.05666L10.4332 2.80156C10.7463 3.10911 10.7467 3.60725 10.4345 3.91546L5.28133 8.99998L10.4342 14.0848C10.7467 14.393 10.746 14.8912 10.4329 15.1987L9.67442 15.9436C9.36094 16.2515 8.85241 16.2515 8.53893 15.9436L2.03711 9.55759C1.72363 9.2497 1.72363 8.75025 2.03711 8.44237Z"
            fill="black"
          />
        </svg>
      </button>
    );
  };

  // -----------------------Content: user profile ----------------------------------
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [userDocId, setUserDocId] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setUsername(user.username);
    setFullName(user.fullName);
    setEmail(user.emailAdress);
    setUserDocId(user.docId);
  });

  // function for updating user's data in firebase
  async function _updateUserData() {
    const usernameUpd = document.querySelector("#username");
    const fullNameUpd = document.querySelector("#fullName");
    const emailAdressUpd = document.querySelector("#emailAdress");

    const usernameExists = await doesUsernameExist(username);

    // console.log(document.querySelectorAll("input"));

    if (
      usernameUpd.value != "" &&
      fullNameUpd.value != "" &&
      emailAdressUpd.value != ""
    ) {
      if (usernameUpd.value.length <= 30) {
        let userNow = firebase.auth().currentUser;
        userNow
          .updateProfile({
            displayName: usernameUpd.value,
            email: emailAdressUpd,
          })
          .then(() => {
            // console.log("user updated", userNow);
          })
          .catch((error) => {
            console.log("error", error);
          });

        updateProfiledata(userDocId, {
          username: usernameUpd.value,
          fullName: fullNameUpd.value,
          emailAdress: emailAdressUpd.value,
          ...(fileData.data
            ? {
                avatarUrl: {
                  basic: fileData.data.url,
                  min: fileData.data.thumb.url,
                },
              }
            : {
                avatarUrl: {
                  basic: user.avatarUrl.basic,
                  min: user.avatarUrl.min,
                },
              }),
        });

        setIsUploading(true);

        setTimeout(() => {
          window.location.reload();
          setIsUploading(false);
        }, 700);
      } else {
        setErrorText(
          "That username is too long, the maximum number of characters is 30"
        );
      }
    } else {
      setErrorText("");
      document.querySelectorAll(".changable-input").forEach((item) => {
        if (item.value == "") {
          item.classList.add("settings-filter");
        }
      });
    }
  }

  // ----- All for image uploading -----

  const [selectedFile, setSelectedFile] = useState();
  const [fileData, setFileData] = useState({});

  useEffect(() => {
    if (!selectedFile) return;
    savePicturedata();
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [uploadProgress, setUploadProgress] = useState(0);
  const [strokeWidth, setStrokeWidth] = useState(0);

  function savePicturedata() {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onprogress = (e) => {
      setStrokeWidth(4);
      setUploadProgress(parseInt(Math.round(e.loaded * 100) / e.total));
    };
    reader.onload = (e) => {
      const formData = new FormData();
      formData.append("image", e.target.result.split(",").pop());
      fetch(
        "https://api.imgbb.com/1/upload?key=c8cb2996c6019fd0def1c3b85e2e4073",
        {
          method: "POST",
          body: formData,
        }
      ).then((response) => response.json().then(setFileData));
      // .then(setUploadProgress(0));
    };
  }

  // -----------------------Content ----------------------------------

  const [themeActive, setThemeActive] = useState("lightTheme");
  const [fontActive, setFontActive] = useState("fontNormal");

  function contentByCategory(category) {
    switch (category) {
      case "user-profile":
        return (
          <div className="flex flex-col ml-4 w-contentSettings h-full lptpXL:w-full settingsBP:items-center settingsBP:ml-0">
            {isUploading ? <StateUpdating /> : null}

            <h2 className="text-xl font-medium lptpXS:text-lg settingsBP:mt-4">
              Main info
            </h2>
            <div className="flex mt-6 items-center lptpXL:mt-2 settingsBP:flex-col">
              <form className="flex flex-col form-userinfo settingsBP:items-center settingsBP:mt-6">
                <Field id="username" title="Username" value={username} />
                <p className="text-xs text-red-primary font-medium w-72">
                  {errorText}
                </p>
                <Field id="fullName" title="Full name" value={fullName} />
                <Field id="emailAdress" title="Email Adress" value={email} />
                {/* <Field title="Username" value={username} /> */}
              </form>
              <div className="rounded-full relative ml-20 lptpXS:ml-0 settingsBP:order-first ">
                <div
                  className="absolute rounded-full bg-modal w-full h-full flex justify-center items-center "
                  onClick={() => {
                    // setStrokeWidth(0);
                    setUploadProgress(0);
                  }}
                >
                  <input
                    type="file"
                    className="avatar-select z-10"
                    onChange={(e) => changeHandler(e)}
                  />
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute "
                  >
                    <path
                      d="M16.8724 5.70523L24.2025 13.0354L8.28541 28.9525L1.75001 29.6739C0.875107 29.7707 0.135909 29.0309 0.233247 28.156L0.960421 21.616L16.8724 5.70523ZM28.7362 4.6139L25.2944 1.17213C24.2208 0.0985474 22.4796 0.0985474 21.406 1.17213L18.1681 4.41006L25.4983 11.7402L28.7362 8.50227C29.8098 7.42812 29.8098 5.68748 28.7362 4.6139Z"
                      fill="white"
                    />
                  </svg>
                </div>

                <CircularProgressbar
                  className="absolute"
                  value={uploadProgress}
                  strokeWidth={strokeWidth}
                  styles={buildStyles({
                    pathColor: `#9A86B5`,
                  })}
                />

                {user.avatarUrl ? (
                  <img
                    src={
                      fileData.data ? fileData.data.url : user.avatarUrl?.basic
                    }
                    className="w-36 h-36 object-cover rounded-full lptpXL:w-32 lptpXL:h-32 lptpXS:w-28 lptpXS:h-28 settingsBP:w-24 settingsBP:h-24"
                    id="avatarProfie"
                  />
                ) : (
                  <Skeleton width={50} height={50} />
                )}
              </div>
            </div>
            <div className="flex self-end mt-auto -mb-12 lptpXL:-mr-20 lptpXS:mr-0 settingsBP:absolute right-4 top-4">
              <SaveButton
                func={() => {
                  _updateUserData();
                }}
              />
            </div>
            {isMobile ? (
              <div className="flex self-end mt-auto -mb-12 lptpXL:-mr-20 lptpXS:mr-0 settingsBP:absolute left-4 top-4">
                <CloseButton
                  func={() => {
                    setOpenModal({
                      ...openModal,
                      ["settingsUserProfileMobile"]: false,
                    });
                  }}
                />
              </div>
            ) : null}
          </div>
        );
        break;

      // __________________________________________________ customization _____________________________________________________

      case "customization":
        return (
          <div className="flex flex-col ml-4 w-contentSettings h-full settingsBP:items-center  settingsBP:w-full settingsBP:mt-4 settingsBP:ml-0  ">
            <h2 className="text-xl font-medium lptpXS:text-lg">Theme:</h2>

            {/* Choosing the theme */}

            <div
              className="flex flex-col settingsBP:w-full settingsBP:px-4 settingsBP:mt-2"
              id="fields-theme"
            >
              <div
                id="lightTheme"
                className="relative flex items-center justify-center w-settingsCardHover h-settingsCardHover mb-4 cursor-pointer lptpXS:w-45 lptpXS:h-10 settingsBP:w-full"
                onClick={(e) => {
                  setThemeActive(e.currentTarget.id);
                }}
              >
                <i
                  className={`absolute z-index-negative rounded-lg left-0 ${
                    "lightTheme" === themeActive ? " opacity-1 " : " opacity-0 "
                  }transition-all top-2 transform bg-gradient-to-r from-gradient-from to-gradient-to w-full h-full`}
                ></i>

                <div className="shadow-xl bg-white z-10 flex w-settingsCard h-settingsCard rounded-lg items-center justify-between px-4 mt-4 lptpXS:w-44 lptpXS:h-9 settingsBP:w-99">
                  <div className="flex ">
                    <img
                      src="\images\icons\settings\sun.svg"
                      className="mr-1"
                    />
                    <p className="font-semibold lptpXS:text-sm">Light</p>
                  </div>
                  <div className="flex w-10 justify-between">
                    <span className="w-3 h-3 bg-themeSettingsExs-lightFirst rounded "></span>
                    <span className="w-3 h-3 bg-themeSettingsExs-lightSecond rounded"></span>
                    <span className="w-3 h-3 bg-themeSettingsExs-lightThird rounded"></span>
                  </div>
                </div>
              </div>

              <div
                id="darkTheme"
                className="relative flex items-center justify-center w-settingsCardHover h-settingsCardHover mb-4 cursor-pointer lptpXS:w-45 lptpXS:h-10 settingsBP:w-full"
                onClick={(e) => {
                  setThemeActive(e.currentTarget.id);
                }}
              >
                <i
                  className={`absolute z-index-negative rounded-lg left-0 ${
                    "darkTheme" === themeActive ? " opacity-1 " : " opacity-0 "
                  }transition-all top-2 transform bg-gradient-to-r from-gradient-from to-gradient-to w-full h-full `}
                ></i>
                <div
                  className="shadow-xl bg-white z-10 flex w-settingsCard h-settingsCard rounded-lg items-center justify-between px-4 mt-4 lptpXS:w-44 lptpXS:h-9 settingsBP:w-99"
                  // onClick={(e) => chooseActiveTheme(e, "darkTheme")}
                >
                  <div className="flex ">
                    <img
                      src="\images\icons\settings\moon.svg"
                      className="mr-1"
                    />
                    <p className="font-semibold lptpXS:text-sm"> Dark</p>
                  </div>
                  <div className="flex w-10 justify-between">
                    <span className="w-3 h-3 bg-themeSettingsExs-darkFirst rounded "></span>
                    <span className="w-3 h-3 bg-themeSettingsExs-darkSecond rounded"></span>
                    <span className="w-3 h-3 bg-themeSettingsExs-darkThird rounded"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Choosing the font size */}

            <h2 className="text-xl font-medium lptpXS:text-lg">Font size:</h2>

            <div
              className="grid grid-cols-2 w-2/3 settingsBP:w-full settingsBP:flex settingsBP:flex-col settingsBP:grid-cols-none settingsBP:px-4"
              id="fields-fonts"
            >
              <div
                id="fontNormal"
                className="relative flex items-center justify-center w-settingsCardHover h-settingsCardHover mb-4 cursor-pointer lptpXS:w-45 lptpXS:h-10 settingsBP:w-full"
                onClick={(e) => {
                  setFontActive(e.currentTarget.id);
                }}
              >
                <i
                  className={`absolute z-index-negative rounded-lg left-0 ${
                    "fontNormal" === fontActive ? " opacity-1 " : " opacity-0 "
                  }transition-all top-2 transform bg-gradient-to-r from-gradient-from to-gradient-to w-full h-full`}
                ></i>

                <div className="shadow-xl bg-white z-10 flex w-settingsCard h-settingsCard rounded-lg items-center justify-between px-4 mt-4 lptpXS:w-44 lptpXS:h-9 settingsBP:w-99">
                  <div className="flex ">
                    <p className="font-semibold lptpXS:text-sm">Normal</p>
                  </div>
                  <div className="flex w-10 justify-between font-medium text-base lptpXS:text-sm">
                    AaBb
                  </div>
                </div>
              </div>

              <div
                id="fontSmall"
                className="relative flex items-center justify-center w-settingsCardHover h-settingsCardHover mb-4 cursor-pointer lptpXS:w-45 lptpXS:h-10 settingsBP:w-full"
                onClick={(e) => {
                  setFontActive(e.currentTarget.id);
                }}
              >
                <i
                  className={`absolute z-index-negative rounded-lg left-0 ${
                    "fontSmall" === fontActive ? " opacity-1 " : " opacity-0 "
                  }transition-all top-2 transform bg-gradient-to-r from-gradient-from to-gradient-to w-full h-full`}
                ></i>
                <div
                  className="shadow-xl bg-white z-10 flex w-settingsCard h-settingsCard rounded-lg items-center justify-between px-4 mt-4 lptpXS:w-44 lptpXS:h-9 settingsBP:w-99"
                  // onClick={(e) => chooseActiveTheme(e, "darkTheme")}
                >
                  <div className="flex ">
                    <p className="font-semibold lptpXS:text-sm"> Small</p>
                  </div>
                  <div className="flex w-10 justify-between font-medium text-sm lptpXS:text-xs">
                    AaBb
                  </div>
                </div>
              </div>

              <div
                id="fontLarge"
                className="relative flex items-center justify-center w-settingsCardHover h-settingsCardHover mb-4 cursor-pointer lptpXS:w-45 lptpXS:h-10 settingsBP:w-full"
                onClick={(e) => {
                  setFontActive(e.currentTarget.id);
                }}
              >
                <i
                  className={`absolute z-index-negative rounded-lg left-0 ${
                    "fontLarge" === fontActive ? " opacity-1 " : " opacity-0 "
                  }transition-all top-2 transform bg-gradient-to-r from-gradient-from to-gradient-to w-full h-full`}
                ></i>
                <div
                  className="shadow-xl bg-white z-10 flex w-settingsCard h-settingsCard rounded-lg items-center justify-between px-4 mt-4 lptpXS:w-44 lptpXS:h-9 settingsBP:w-99"
                  // onClick={(e) => chooseActiveTheme(e, "darkTheme")}
                >
                  <div className="flex ">
                    <p className="font-semibold lptpXS:text-sm"> Large</p>
                  </div>
                  <div className="flex w-10 justify-between font-medium text-lg lptpXS:text-base">
                    AaBb
                  </div>
                </div>
              </div>
            </div>

            <div className="flex self-end mt-auto -mb-12 lptpXL:-mr-20 lptpXS:mr-0 settingsBP:absolute right-4 top-4">
              <SaveButton
                func={() => {
                  _updateUserData();
                }}
              />
            </div>

            {isMobile ? (
              <div className="flex self-end mt-auto -mb-12 lptpXL:-mr-20 lptpXS:mr-0 settingsBP:absolute left-4 top-4">
                <CloseButton
                  func={() => {
                    setOpenModal({
                      ...openModal,
                      ["settingsCustomizationMobile"]: false,
                    });
                  }}
                />
              </div>
            ) : null}
          </div>
        );
      case "privacy":
        return (
          <div className="flex flex-col ml-4 w-contentSettings h-full">
            <h2 className="text-xl font-medium lptpXS:text-lg">
              Coming soon..
            </h2>
          </div>
        );
      case "help":
        return (
          <div className="flex flex-col ml-4 w-contentSettings h-full">
            <h2 className="text-xl font-medium lptpXS:text-lg">
              Coming soon..
            </h2>
          </div>
        );
      case "about":
        return (
          <div className="flex flex-col ml-4 w-contentSettings h-full">
            <h2 className="text-xl font-medium lptpXS:text-lg">
              Coming soon..
            </h2>
          </div>
        );
      default:
        break;
    }
  }

  return <div>{contentByCategory(category)}</div>;
}
