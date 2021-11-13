import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import ButtonSecond from "../../../shared/button-2";
import PublicationSuccess from "../publication-success/";
import { addPublication } from "../../../services/firebase";

export default function Content({ user }) {
  const [isPublished, setIsPublished] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [fileData, setFileData] = useState({});
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    if (!selectedFile) return;
    savePicturedata();
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  function savePicturedata() {
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
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
    };
  }

  function savePostData() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (isFilePicked) {
      //post article proto
      const post = {
        category: "Photography",
        dateCreate: new Date().toLocaleDateString("en-US", options),
        id: new Date().getTime().toString(),
        photo: fileData.data.url,
        type: "photography",
        userId: user.uid,
        comments: [],
      };

      //add to db and clean fields
      addPublication(post);
      setSelectedFile("");
      setIsFilePicked(false);
      setFileData({});
      document.querySelector("#cont").classList.remove("border-red-primary");

      //show modal with success
      setIsPublished(true);
      setTimeout(() => {
        setIsPublished(false);
      }, 3000);
    } else {
      document.querySelector("#cont").classList.add("border-red-primary");
    }
  }

  return (
    <div className="flex-col items-center flex h-full py-10 relative">
      <div
        className={`top-1 rounded-lg ${isFilePicked ? null : "border-dashed"}
        }  border border-default-first w-uploadLarge h-uploadLarge flex justify-center flex-col items-center relative`}
        id="cont"
      >
        {isFilePicked ? (
          fileData.data ? (
            <div className="w-full h-full relative">
              <button
                onClick={() => {
                  setSelectedFile("");
                  setIsFilePicked(false);
                  setFileData({});
                }}
                className="-top-2 -right-2 absolute p-1 rounded-full border border-default-first bg-white"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L9 9"
                    stroke="#9A86B5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                  <path
                    d="M1 9L9 1"
                    stroke="#9A86B5"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
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
          <span className="text-base text-default-first flex justify-center flex-col items-center font-medium">
            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.33333 5.57812V0H1C0.445833 0 0 0.438867 0 0.984375V20.0156C0 20.5611 0.445833 21 1 21H15C15.5542 21 16 20.5611 16 20.0156V6.5625H10.3333C9.78333 6.5625 9.33333 6.11953 9.33333 5.57812ZM12.0492 14.4379H9.33333V17.7192C9.33333 18.0817 9.035 18.3754 8.66667 18.3754H7.33333C6.965 18.3754 6.66667 18.0817 6.66667 17.7192V14.4379H3.95083C3.35583 14.4379 3.05875 13.7287 3.48125 13.3157L7.49875 9.39053C7.77583 9.11941 8.22333 9.11941 8.50042 9.39053L12.5179 13.3157C12.9408 13.7287 12.6442 14.4379 12.0492 14.4379ZM15.7083 4.30664L11.6292 0.287109C11.4417 0.102539 11.1875 0 10.9208 0H10.6667V5.25H16V4.9998C16 4.74141 15.8958 4.49121 15.7083 4.30664Z"
                fill="#9A86B5"
              />
            </svg>
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
      </div>

      <div
        className="absolute right-0 -bottom-10"
        onClick={() => savePostData()}
      >
        <ButtonSecond />
      </div>
      <PublicationSuccess isPublished={isPublished} />
    </div>
  );
}
