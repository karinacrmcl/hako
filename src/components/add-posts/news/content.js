import React, { useEffect, useState } from "react";
import { addPublication } from "../../../services/firebase";
import PublicationSuccess from "../publication-success/";
import Loader from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";
import Skeleton from "react-loading-skeleton";
import ButtonFilled from "../../../shared/components/button-filled";
import { MediaFieldEmpty } from "../media-field-empty";
import SvgSelector from "../svg-selector";
import { MediaFieldFilled } from "./media-field-filled";
import { bytesToSize } from "../../../utils/format-bytes";
import SymbolsLimit from "../symbols-limit";
import { savePicturedata } from "./save-picture-data";

export default function Content({ user }) {
  const [newsTitle, setNewsTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [srcLink, setSrcLink] = useState("");

  const [isPublished, setIsPublished] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [fileData, setFileData] = useState([]);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "450px" });

  useEffect(() => {
    if (!selectedFile) return;
    savePicturedata(selectedFile, setIsLoading, setFileData);
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  function deletePictureData(id) {
    let result = fileData.filter((item) => item.data.id !== id);
    setFileData(result);
  }

  const currentUploaded = fileData.length;
  let maximumUploaded = 3;

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

      addPublication(post);
      setNewsTitle("");
      setAuthor("");
      setText("");
      setSrcLink("");
      setFileData([]);
      document.querySelectorAll(".input-add").forEach((item) => {
        item.classList.remove("input-error");
      });
      document.querySelectorAll(".textarea-add").forEach((item) => {
        item.classList.remove("textarea-error");
      });

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
      <SymbolsLimit length={text.length} limit={symbolsLimit} />
      <p className="text-gray-addtext mt-1 lptpXL:text-sm lptpXL:-mt-3">
        Upload media files:
      </p>
      <div className="flex items-center justify-between w-full">
        {currentUploaded === maximumUploaded ? null : (
          <MediaFieldEmpty func={changeHandler} isMobile={isMobile} />
        )}
        <div className="flex jsutify-start items-center w-full">
          {fileData.length !== 0
            ? fileData.map((item) => (
                <MediaFieldFilled
                  type={item.data.image.extension}
                  title={item.data.image.filename}
                  size={bytesToSize(item.data.size)}
                  id={item.data.id}
                  link={item.data.url}
                  func={deletePictureData}
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

      <PublicationSuccess isPublished={isPublished} />
    </div>
  );
}
