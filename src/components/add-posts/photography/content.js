import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import PublicationSuccess from "../publication-success/";
import { addPublication } from "../../../services/firebase";
import { useMediaQuery } from "react-responsive";
import ButtonFilled from "../../../shared/components/button-filled";
import { savePicturedata } from "../../../utils/save-picture-data";
import SvgSelector from "../svg-selector";

export default function Content({ user }) {
  const [isPublished, setIsPublished] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [fileData, setFileData] = useState({});
  const [isFilePicked, setIsFilePicked] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: "650px" });

  useEffect(() => {
    if (!selectedFile) return;
    savePicturedata(setFileData, selectedFile);
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  function cleanFields() {
    setSelectedFile("");
    setIsFilePicked(false);
    setFileData({});
  }

  function savePostData() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (isFilePicked) {
      const post = {
        category: "Photography",
        dateCreate: new Date().toLocaleDateString("en-US", options),
        id: new Date().getTime().toString(),
        photo: fileData.data.url,
        type: "photography",
        userId: user.uid,
        comments: [],
      };

      addPublication(post);
      cleanFields();
      document.querySelector("#cont").classList.remove("border-red-primary");

      setIsPublished(true);
      setTimeout(() => {
        setIsPublished(false);
      }, 3000);
    } else {
      document.querySelector("#cont").classList.add("border-red-primary");
    }
  }

  return (
    <div className="flex-col items-center flex h-full py-10 relative lptpXL:py-5">
      <div
        className={`top-1 rounded-lg ${
          isFilePicked ? null : "border-dashed mobileXL:border-opacity-0 "
        }
         border border-default-first w-uploadLarge h-uploadLarge flex justify-center flex-col items-center relative mobileXL:bg-gray-bgMobile`}
        id="cont"
      >
        {isFilePicked ? (
          fileData.data ? (
            <div className="w-full h-full relative">
              <button
                onClick={() => {
                  cleanFields();
                }}
                className="-top-2 -right-2 absolute p-1 rounded-full border border-default-first bg-white"
              >
                <SvgSelector id="cancel" />
              </button>
              <img
                src={fileData.data.url}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ) : (
            <Loader type="ThreeDots" color="#9A86B5" height={20} width={20} />
          )
        ) : (
          <>
            {isMobile ? (
              <span className="text-base text-default-first flex justify-center flex-col items-center font-medium">
                <SvgSelector id="gallery-mobile" />

                <input
                  type="file"
                  id="upload"
                  className="border-b border-default-first w-full h-full flex input-file absolute z-100"
                  onChange={(e) => changeHandler(e)}
                />
              </span>
            ) : (
              <span className="text-base text-default-first flex justify-center flex-col items-center font-medium">
                Drop files to upload or
                <label
                  htmlFor="upload"
                  className="cursor-pointer font-bold underline"
                >
                  choose file
                </label>
                <input
                  type="file"
                  id="upload"
                  className="border-b border-default-first w-28 flex input-file"
                  onChange={(e) => changeHandler(e)}
                />
              </span>
            )}
          </>
        )}
      </div>

      <PublicationSuccess isPublished={isPublished} />
    </div>
  );
}
