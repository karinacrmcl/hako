import React, { useEffect, useState } from "react";
import { addPublication } from "../../../services/firebase";
import PublicationSuccess from "../publication-success/";
import ButtonSecond from "../../../shared/button-2";
import Loader from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";
import Skeleton from "react-loading-skeleton";

export default function Content({ user }) {
  //inputs with the text
  const [newsTitle, setNewsTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [srcLink, setSrcLink] = useState("");

  //is published
  const [isPublished, setIsPublished] = useState(false);

  //media states
  const [selectedFile, setSelectedFile] = useState();
  const [fileData, setFileData] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "450px" });

  //media uploading
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
      setIsLoading(true);
      fetch(
        "https://api.imgbb.com/1/upload?key=c8cb2996c6019fd0def1c3b85e2e4073",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => setFileData((prev) => [...prev, data]))
        .finally(() => {
          setIsLoading(false);
        });
    };
  }

  function deletePictureData(id) {
    let result = fileData.filter((item) => item.data.id !== id);
    setFileData(result);
  }

  const MediaFieldFilled = ({ type, title, size, id, link }) => {
    return (
      <>
        {isMobile ? (
          <div className="w-20 h-20 ml-2">
            {link ? (
              <img src={link} className="w-20 h-20 rounded-lg object-cover" />
            ) : (
              <Skeleton width={80} height={80} />
            )}
          </div>
        ) : (
          <div className="border border-default-first w-uploadSmall h-uploadSmall flex items-center rounded-lg p-3 mt-2 mr-4 select-none relative lptpXL:h-16 lptpXL:w-40">
            <button
              className="bg-white p-1 absolute -right-2 -top-2 rounded-full border border-default-first"
              onClick={() => {
                deletePictureData(id);
              }}
            >
              <svg
                width="10"
                height="10"
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
            <div className="relative">
              <svg
                width="25"
                height="33"
                viewBox="0 0 25 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.1923 7.12272L24.1925 7.1229C24.3646 7.2933 24.4698 7.51583 24.4944 7.75H17.1667V0.504767C17.4152 0.527904 17.645 0.634447 17.8188 0.806497L24.1923 7.12272ZM1.5625 0.5H14.0833V8.76562C14.0833 9.89727 15.0151 10.8125 16.1458 10.8125H24.5V31.4531C24.5 32.0295 24.032 32.5 23.4375 32.5H1.5625C0.968008 32.5 0.5 32.0295 0.5 31.4531V1.54687C0.5 0.970517 0.968007 0.5 1.5625 0.5Z"
                  stroke="#9A86B5"
                />
              </svg>
              <p className="absolute text-xxs font-bold text-default-first bottom-0.5 left-1/2 transform -translate-x-1/2">
                {type}
              </p>
            </div>
            <div className="flex flex-col ml-2">
              <p className="text-xs text-primary font-medium">{title}</p>
              <span className="text-xxs text-default-first"> {size}</span>
            </div>
          </div>
        )}
      </>
    );
  };

  const MediaFieldEmpty = () => {
    return (
      <>
        {isMobile ? (
          <div className="relative cursor-pointer">
            <input
              className="cursor-pointer w-20 h-20 bg-gray-addContainer flex items-center rounded-lg cursor-pointer justify-center transition-all file-select mt-1 "
              type="file"
              onChange={(e) => changeHandler(e)}
            />
            <svg
              width="18"
              height="18"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            >
              <rect x="6" width="2" height="14" rx="1" fill="#B4B4B4" />
              <rect
                x="14"
                y="6"
                width="2"
                height="14"
                rx="1"
                transform="rotate(90 14 6)"
                fill="#B4B4B4"
              />
            </svg>
          </div>
        ) : (
          <div className="relative cursor-pointer">
            <input
              className="cursor-pointer border border-dashed border-default-first w-uploadSmall h-uploadSmall flex items-center rounded-lg p-0.5 mt-2 mr-4 cursor-pointer justify-center transition-all opacity-80 hover:opacity-100 file-select lptpXL:h-16 lptpXL:w-40"
              type="file"
              onChange={(e) => changeHandler(e)}
            />
            <svg
              width="16"
              height="21"
              viewBox="0 0 16 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-1/2 left-1/2 transform -translate-y-1/4 -translate-x-2/3"
            >
              <path
                d="M9.33333 5.57812V0H1C0.445833 0 0 0.438867 0 0.984375V20.0156C0 20.5611 0.445833 21 1 21H15C15.5542 21 16 20.5611 16 20.0156V6.5625H10.3333C9.78333 6.5625 9.33333 6.11953 9.33333 5.57812ZM12.0492 14.4379H9.33333V17.7192C9.33333 18.0817 9.035 18.3754 8.66667 18.3754H7.33333C6.965 18.3754 6.66667 18.0817 6.66667 17.7192V14.4379H3.95083C3.35583 14.4379 3.05875 13.7287 3.48125 13.3157L7.49875 9.39053C7.77583 9.11941 8.22333 9.11941 8.50042 9.39053L12.5179 13.3157C12.9408 13.7287 12.6442 14.4379 12.0492 14.4379ZM15.7083 4.30664L11.6292 0.287109C11.4417 0.102539 11.1875 0 10.9208 0H10.6667V5.25H16V4.9998C16 4.74141 15.8958 4.49121 15.7083 4.30664Z"
                fill="#9A86B5"
              />
            </svg>
          </div>
        )}
      </>
    );
  };

  //converting bytes
  function bytesToSize(bytes) {
    let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }

  // maximum value of uploaded pictures

  // let currentUploaded = fileData.length || 0;
  const currentUploaded = fileData.length;
  let maximumUploaded = 3;

  // submit the data
  function savePostData() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const optionsUpdate = {
      hour: "numeric",
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    if (newsTitle && author && text && srcLink && text.length <= symbolsLimit) {
      //post article proto
      const post = {
        category: "Latest News",
        dateCreate: new Date().toLocaleDateString("en-US", options),
        id: new Date().getTime().toString(),

        newsTitle,
        text,
        author,
        srcLink,
        type: "news",
        userId: user.uid,
        updated: new Date().toLocaleDateString("en-US", optionsUpdate),
        media: fileData,
        comments: [],
      };

      //add to db and clean fields
      addPublication(post);
      setNewsTitle("");
      setAuthor("");
      setText("");
      setSrcLink("");
      setFileData([]);
      //remove optional styles
      document.querySelectorAll(".input-add").forEach((item) => {
        item.classList.remove("input-error");
      });
      document.querySelectorAll(".textarea-add").forEach((item) => {
        item.classList.remove("textarea-error");
      });

      //show modal with success
      setIsPublished(true);
      setTimeout(() => {
        setIsPublished(false);
      }, 3000);
    } else {
      document.querySelectorAll(".input-add").forEach((item) => {
        if (item.value == "") {
          item.classList.add("input-error");
        }
      });
      document.querySelectorAll(".textarea-add").forEach((item) => {
        if (item.value == "") {
          item.classList.add("textarea-error");
        }
      });
    }
  }

  const symbolsLimit = 700;

  return (
    <div className="flex-col flex h-full py-10  relative lptpXL:py-5">
      <input
        className="input-add"
        placeholder="News title.."
        value={newsTitle}
        onChange={({ target }) => {
          setNewsTitle(target.value);
        }}
      ></input>
      <input
        className="input-add mt-6"
        placeholder="Author.."
        value={author}
        onChange={({ target }) => {
          setAuthor(target.value);
        }}
      ></input>
      <textarea
        className="textarea-add mt-6 h-60 resize-none"
        placeholder="Briefly tell us what happened.."
        value={text}
        onChange={({ target }) => {
          setText(target.value);
        }}
      ></textarea>
      <p
        className={`flex justify-end mt-1 lptpXL:text-sm ${
          text.length <= symbolsLimit
            ? `text-gray-extralight`
            : `text-red-primary`
        }`}
      >
        {text.length}/{symbolsLimit}
      </p>
      <p className="text-gray-addtext mt-1 lptpXL:text-sm lptpXL:-mt-3">
        Upload media files:
      </p>
      <div className="flex items-center justify-between w-full">
        {currentUploaded === maximumUploaded ? null : <MediaFieldEmpty />}
        <div className="flex jsutify-start items-center w-full">
          {fileData.length !== 0
            ? fileData.map((item) => (
                <MediaFieldFilled
                  type={item.data.image.extension}
                  title={item.data.image.filename}
                  size={bytesToSize(item.data.size)}
                  id={item.data.id}
                  link={item.data.url}
                />
              ))
            : null}
          {isLoading && (
            <Loader
              className="ml-20 mobileXL:ml-10"
              type="ThreeDots"
              color="#9A86B5"
              height={20}
              width={20}
            />
          )}
        </div>

        <div className="text-sm text-default-first flex">
          <p className="mr-1">{fileData.length}</p> /{" "}
          <p className="ml-1">{maximumUploaded}</p>
        </div>
      </div>
      <input
        className="input-add mt-6"
        placeholder="Source link.."
        value={srcLink}
        onChange={({ target }) => {
          setSrcLink(target.value);
        }}
      ></input>
      <div
        className="absolute right-0 -bottom-10 tabletXL:-top-12 tabletXL:bottom-auto mobileXL:-top-9"
        onClick={(e) => savePostData(e)}
      >
        <ButtonSecond />
      </div>
      <PublicationSuccess isPublished={isPublished} />
    </div>
  );
}
