import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useMediaQuery } from "react-responsive";
import { addPublication } from "../../../services/firebase";
import { bytesToSize } from "../../../utils/format-bytes";
import Base from "../layout";
import { MediaFieldEmpty } from "../media-field-empty";
import PublicationSuccess from "../publication-success";
import { MediaFieldFilled } from "./media-field-filled";
import { savePicturedata } from "./save-picture-data";
import { dateOptions } from "../../../constants/date-options";
import { useForm } from "react-hook-form";

export default function AddNews({ user }) {
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

  function deletePicturesData() {
    setIsFilePicked(false);
    setSelectedFile();
    setFileData([]);
  }

  const currentUploaded = fileData.length;
  let maximumUploaded = 3;

  const onSubmit = (data) => {
    const optionsUpdate = {
      hour: "numeric",
      month: "long",
      day: "numeric",
      year: "numeric",
    };

    if (fileData) {
      const post = {
        category: "Latest News",
        dateCreate: new Date().toLocaleDateString("en-US", dateOptions),
        id: new Date().getTime().toString(),
        newsTitle: data.title,
        text: data.text,
        author: data.author,
        srcLink: data.srcLink,
        type: "news",
        userId: user.uid,
        updated: new Date().toLocaleDateString("en-US", optionsUpdate),
        media: fileData,
        comments: [],
      };
      reset();
      setIsPublished(true);
      deletePicturesData();
      setTimeout(() => {
        setIsPublished(false);
      }, 3000);
      addPublication(post);
    } else {
      return;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  return (
    <Base
      category="News"
      categoryKey="modalAddNews"
      onPostHandler={handleSubmit(onSubmit)}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex-col flex h-full py-10 relative lptpXL:py-5 lptpXL:w-full"
      >
        <input
          className={`input-add mb-2 ${errors.title && "input-error"}`}
          placeholder="Title of the news article"
          type="text"
          id="title"
          name="title"
          {...register("title", {
            validate: (value) => value.length > 20 && value.length < 120,
          })}
        />
        {errors.title && (
          <p className="text-sm ml-2 mt-2 text-gray-light">
            Your title is too short or too long
          </p>
        )}

        <input
          className={`input-add mt-2 ${errors.author && "input-error"}`}
          placeholder="Author of the news article"
          type="text"
          id="author"
          name="author"
          {...register("author", {
            validate: (value) => value.length > 0,
          })}
        />
        {errors.author && (
          <p className="text-sm ml-2 mt-2 text-gray-light">Field is required</p>
        )}

        <textarea
          className={`textarea-add mt-6 h-60 resize-none ${
            errors.text && "textarea-error"
          }`}
          placeholder="Briefly tell us what happened"
          {...register("text", {
            validate: (value) => value.length > 100 && value.length < 1000,
          })}
        ></textarea>

        <p className="text-gray-addtext mt-6 lptpXL:text-sm lptpXL:-mt-3">
          Upload media files:
        </p>
        <div className="flex items-center justify-between w-full">
          {currentUploaded === maximumUploaded ? null : (
            <MediaFieldEmpty func={changeHandler} isMobile={isMobile} />
          )}
          <div className="flex justify-start items-center w-full">
            {fileData.length !== 0
              ? fileData.map((item) => (
                  <MediaFieldFilled
                    key={item.data.id}
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
          className={`input-add mt-6 ${errors.author && "input-error"}`}
          placeholder="Source link"
          type="text"
          id="srcLink"
          name="srcLink"
          {...register("srcLink", {
            validate: (value) => value.length > 0,
          })}
        />
        {errors.author && (
          <p className="text-sm ml-2 mt-2 text-gray-light">Field is required</p>
        )}
        <PublicationSuccess isPublished={isPublished} />
      </form>
    </Base>
  );
}
