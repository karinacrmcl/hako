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

export default function Content({ category }) {
  const { user } = useUser();

  // ----------------------- Save button ----------------------------------

  const SaveButton = ({ func }) => {
    return (
      <button
        onClick={func}
        className="bg-gradient-to-r p-1 px-4 demoGradient text-xl font-semibold text-white rounded-lg transition-all "
      >
        Save
      </button>
    );
  };

  // -----------------------Content: user profile ----------------------------------
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [fullName, setFullName] = useState(null);
  const [userDocId, setUserDocId] = useState(null);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setUsername(user.username);
    setFullName(user.fullName);
    setEmail(user.emailAdress);
    setUserDocId(user.docId);
  });

  // function for updating user's data in firebase
  function _updateUserData() {
    const usernameUpd = document.querySelector("#username");
    const fullNameUpd = document.querySelector("#fullName");
    const emailAdressUpd = document.querySelector("#emailAdress");

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
          <div className="flex flex-col ml-4 w-contentSettings h-full">
            {isUploading ? <StateUpdating /> : null}

            <h2 className="text-xl font-medium">Main info</h2>
            <div className="flex mt-6 items-center">
              <form className="flex flex-col form-userinfo">
                <Field id="username" title="Username" value={username} />
                <Field id="fullName" title="Full name" value={fullName} />
                <Field id="emailAdress" title="Email Adress" value={email} />
                {/* <Field title="Username" value={username} /> */}
              </form>
              <div className="rounded-full relative ml-20">
                <div
                  className="absolute rounded-full bg-modal w-full h-full flex justify-center items-center"
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
                    className="w-36 h-36 object-cover rounded-full"
                    id="avatarProfie"
                  />
                ) : (
                  <Skeleton width={50} height={50} />
                )}
              </div>
            </div>
            <div className="flex self-end mt-auto -mb-12">
              <SaveButton
                func={() => {
                  _updateUserData();
                }}
              />
            </div>
          </div>
        );
        break;

      // __________________________________________________ customization _____________________________________________________

      case "customization":
        return (
          <div className="flex flex-col ml-4 w-contentSettings h-full">
            <h2 className="text-xl font-medium">Theme:</h2>

            {/* Choosing the theme */}

            <div className="flex flex-col" id="fields-theme">
              <div
                id="lightTheme"
                className="relative flex items-center justify-center w-settingsCardHover h-settingsCardHover mb-4 cursor-pointer"
                onClick={(e) => {
                  setThemeActive(e.currentTarget.id);
                }}
              >
                <i
                  className={`absolute z-index-negative rounded-lg left-0 ${
                    "lightTheme" === themeActive ? " opacity-1 " : " opacity-0 "
                  }transition-all top-2 transform bg-gradient-to-r from-gradient-from to-gradient-to w-full h-full`}
                ></i>

                <div className="shadow-xl bg-white z-10 flex w-settingsCard h-settingsCard rounded-lg items-center justify-between px-4 mt-4">
                  <div className="flex ">
                    <img
                      src="\images\icons\settings\sun.svg"
                      className="mr-1"
                    />
                    <p className="font-semibold">Light</p>
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
                className="relative flex items-center justify-center w-settingsCardHover h-settingsCardHover mb-4 cursor-pointer"
                onClick={(e) => {
                  setThemeActive(e.currentTarget.id);
                }}
              >
                <i
                  className={`absolute z-index-negative rounded-lg left-0 ${
                    "darkTheme" === themeActive ? " opacity-1 " : " opacity-0 "
                  }transition-all top-2 transform bg-gradient-to-r from-gradient-from to-gradient-to w-full h-full`}
                ></i>
                <div
                  className="shadow-xl bg-white z-10 flex w-settingsCard h-settingsCard rounded-lg items-center justify-between px-4 mt-4"
                  // onClick={(e) => chooseActiveTheme(e, "darkTheme")}
                >
                  <div className="flex ">
                    <img
                      src="\images\icons\settings\moon.svg"
                      className="mr-1"
                    />
                    <p className="font-semibold"> Dark</p>
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

            <h2 className="text-xl font-medium">Font size:</h2>

            <div className="grid grid-cols-2 w-2/3" id="fields-fonts">
              <div
                id="fontNormal"
                className="relative flex items-center justify-center w-settingsCardHover h-settingsCardHover mb-4 cursor-pointer"
                onClick={(e) => {
                  setFontActive(e.currentTarget.id);
                }}
              >
                <i
                  className={`absolute z-index-negative rounded-lg left-0 ${
                    "fontNormal" === fontActive ? " opacity-1 " : " opacity-0 "
                  }transition-all top-2 transform bg-gradient-to-r from-gradient-from to-gradient-to w-full h-full`}
                ></i>

                <div className="shadow-xl bg-white z-10 flex w-settingsCard h-settingsCard rounded-lg items-center justify-between px-4 mt-4">
                  <div className="flex ">
                    <p className="font-semibold">Normal</p>
                  </div>
                  <div className="flex w-10 justify-between font-medium text-base">
                    AaBb
                  </div>
                </div>
              </div>

              <div
                id="fontSmall"
                className="relative flex items-center justify-center w-settingsCardHover h-settingsCardHover mb-4 cursor-pointer"
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
                  className="shadow-xl bg-white z-10 flex w-settingsCard h-settingsCard rounded-lg items-center justify-between px-4 mt-4"
                  // onClick={(e) => chooseActiveTheme(e, "darkTheme")}
                >
                  <div className="flex ">
                    <p className="font-semibold"> Small</p>
                  </div>
                  <div className="flex w-10 justify-between font-medium text-xs">
                    AaBb
                  </div>
                </div>
              </div>

              <div
                id="fontLarge"
                className="relative flex items-center justify-center w-settingsCardHover h-settingsCardHover mb-4 cursor-pointer"
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
                  className="shadow-xl bg-white z-10 flex w-settingsCard h-settingsCard rounded-lg items-center justify-between px-4 mt-4"
                  // onClick={(e) => chooseActiveTheme(e, "darkTheme")}
                >
                  <div className="flex ">
                    <p className="font-semibold"> Large</p>
                  </div>
                  <div className="flex w-10 justify-between font-medium text-lg">
                    AaBb
                  </div>
                </div>
              </div>
            </div>

            <div className="flex self-end mt-20 ">
              <SaveButton />
            </div>
          </div>
        );
      case "privacy":
        return (
          <div className="flex flex-col ml-4 w-contentSettings h-full">
            <h2 className="text-xl font-medium">Coming soon..</h2>
          </div>
        );
      case "help":
        return (
          <div className="flex flex-col ml-4 w-contentSettings h-full">
            <h2 className="text-xl font-medium">Coming soon..</h2>
          </div>
        );
      case "about":
        return (
          <div className="flex flex-col ml-4 w-contentSettings h-full">
            <h2 className="text-xl font-medium">Coming soon..</h2>
          </div>
        );
      default:
        break;
    }
  }

  return <div>{contentByCategory(category)}</div>;
}
