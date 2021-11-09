import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Firebase } from "../../../../lib/firebase";
import { updateProfiledata } from "../../../../services/firebase";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import StateUpdating from "../../state";
import Skeleton from "react-loading-skeleton";
import ButtonFilled from "../../../../shared/components/button-filled";
import { useMediaQuery } from "react-responsive";
import { useModal } from "../../../../context/modal-context";
import { savePicturedata } from "./save-picture-data";
import SvgSelector from "../../svg-selector";

export function UserProfile({ user }) {
  const [isUploading, setIsUploading] = useState(false);
  const { openModal, setOpenModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isMobile = useMediaQuery({ maxWidth: "700px" });

  async function onSubmit(data) {
    let updatedUser = Firebase.auth().currentUser;
    updatedUser
      .updateProfile({
        displayName: data.username,
        email: data.emailAdress,
      })
      .then(() => {})
      .catch((error) => {
        console.log("error", error);
      });

    updateProfiledata(user?.docId, {
      username: data.username,
      fullName: data.fullName,
      emailAdress: data.emailAdress,
      ...(fileData.data
        ? {
            avatarUrl: {
              basic: fileData.data.url,
              min: fileData.data.thumb.url,
            },
          }
        : {
            avatarUrl: {
              basic: user?.avatarUrl?.basic,
              min: user?.avatarUrl?.min,
            },
          }),
    });

    setIsUploading(true);

    setTimeout(() => {
      window.location.reload();
      setIsUploading(false);
    }, 700);
  }

  const [selectedFile, setSelectedFile] = useState();
  const [fileData, setFileData] = useState({});

  useEffect(() => {
    if (!selectedFile) return;
    savePicturedata(
      selectedFile,
      setStrokeWidth,
      setUploadProgress,
      setFileData
    );
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const [uploadProgress, setUploadProgress] = useState(0);
  const [strokeWidth, setStrokeWidth] = useState(0);

  return (
    <div className="flex flex-col ml-4 w-contentSettings h-full lptpXL:w-full settingsBP:items-center settingsBP:ml-0">
      {isUploading ? <StateUpdating /> : null}

      <h2 className="text-xl font-medium lptpXS:text-lg settingsBP:mt-4">
        Main info
      </h2>
      <div className="flex mt-6 items-center lptpXL:mt-2 settingsBP:flex-col">
        <form
          className="flex flex-col form-userinfo settingsBP:items-center settingsBP:mt-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="text-sm font-medium lptpXS:text-xs"> Username </p>

          <input
            className={`changable-input border mt-1 mb-2 rounded-lg border-primary p-2 h-8 lptpXL:h-7 lptpXL:text-base lptpXS:text-sm lptpXS:h-6 lptpXS:w-44 border-settings-mobile settingsBP:w-full ${
              errors.title && "input-error"
            }`}
            placeholder="Username"
            type="text"
            id="username"
            name="username"
            defaultValue={user.username}
            {...register("username", {
              validate: (value) => value.length > 1 && value.length < 30,
            })}
          />
          {errors.username && (
            <p className="text-sm ml-2 mt-2 text-gray-light">
              Choose a valid username.
            </p>
          )}
          <p className="text-sm font-medium lptpXS:text-xs"> Full name </p>

          <input
            className={`changable-input border mt-1 mb-2 rounded-lg border-primary p-2 h-8 lptpXL:h-7 lptpXL:text-base lptpXS:text-sm lptpXS:h-6 lptpXS:w-44 border-settings-mobile settingsBP:w-full ${
              errors.title && "input-error"
            }`}
            defaultValue={user.fullName}
            placeholder="Full Name"
            type="text"
            id="fullName"
            name="fullName"
            {...register("fullName", {
              validate: (value) => value.split(" ").length > 1,
            })}
          />
          {errors.fullName && (
            <p className="text-sm ml-2 mt-2 text-gray-light">
              Please enter a correct full name.
            </p>
          )}
          <p className="text-sm font-medium lptpXS:text-xs"> Email adress </p>

          <input
            className={`changable-input border mt-1 mb-2 rounded-lg border-primary p-2 h-8 lptpXL:h-7 lptpXL:text-base lptpXS:text-sm lptpXS:h-6 lptpXS:w-44 border-settings-mobile settingsBP:w-full ${
              errors.title && "input-error"
            }`}
            defaultValue={user.emailAdress}
            placeholder="Email adress"
            type="email"
            id="emailAdress"
            name="emailAdress"
            {...register("emailAdress", {
              validate: (value) =>
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                  value
                ),
            })}
          />
          {errors.emailAdress && (
            <p className="text-sm ml-2 mt-2 text-gray-light">
              Please enter a valid email
            </p>
          )}
        </form>
        <div className="rounded-full relative ml-20 lptpXS:ml-0 settingsBP:order-first ">
          <div
            className="absolute rounded-full bg-modal w-full h-full flex justify-center items-center "
            onClick={() => {
              setUploadProgress(0);
            }}
          >
            <input
              type="file"
              className="avatar-select z-10"
              onChange={(e) => changeHandler(e)}
            />
            <SvgSelector id="edit" />
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
              src={fileData.data ? fileData.data.url : user.avatarUrl?.basic}
              className="w-36 h-36 object-cover rounded-full lptpXL:w-32 lptpXL:h-32 lptpXS:w-28 lptpXS:h-28 settingsBP:w-24 settingsBP:h-24"
              id="avatarProfie"
            />
          ) : (
            <Skeleton width={50} height={50} />
          )}
        </div>
      </div>
      <div className="flex self-end mt-auto -mb-12 lptpXL:-mr-20 lptpXS:mr-0 settingsBP:absolute right-4 top-4">
        <ButtonFilled func={handleSubmit(onSubmit)}>Save</ButtonFilled>
      </div>
      {isMobile ? (
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
      ) : null}
    </div>
  );
}
