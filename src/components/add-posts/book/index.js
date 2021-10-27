import React, { useState, useEffect } from "react";
import Base from "../layout";

import PublicationSuccess from "../publication-success";
import Loader from "react-loader-spinner";
import { MediaFieldEmpty } from "../media-field-empty";

import { addPublication } from "../../../services/firebase";
import { useMediaQuery } from "react-responsive";
import { bytesToSize } from "../../../utils/format-bytes";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { MediaFieldFilled } from "./media-field-filled";
import { savePicturedata } from "../../../utils/save-picture-data";

import Select from "react-select";

import { useForm, Controller } from "react-hook-form";
import { dateOptions } from "../../../constants/date-options";
import { genresOptions } from "../../../constants/book-genres";
import { yearOptions } from "../../../constants/year-options";

export default function AddBook({ user }) {
  const [isPublished, setIsPublished] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [fileData, setFileData] = useState({});

  const isMobile = useMediaQuery({ maxWidth: "1024px" });

  useEffect(() => {
    if (!selectedFile) return;
    savePicturedata(setFileData, selectedFile);
  }, [selectedFile]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const deletePictureData = () => {
    setFileData({});
    setIsFilePicked(false);
    setSelectedFile(null);
  };

  const onSubmit = (data) => {
    if (fileData?.data) {
      const post = {
        category: "Books recomendations",
        dateCreate: new Date().toLocaleDateString("en-US", dateOptions),
        id: new Date().getTime().toString(),
        booksTitle: data.title,
        author: data.author,
        year: data.year,
        genres: data.genres,
        description: data.description,
        type: "book",
        coverPhoto: fileData.data.url,
        userId: user.uid,
        comments: [],
      };
      reset();
      setIsPublished(true);
      deletePictureData();
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
      category="Books"
      categoryKey="modalAddBook"
      onPostHandler={handleSubmit(onSubmit)}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex-col flex h-full py-10 relative lptpXL:py-5 lptpXL:w-full"
      >
        <input
          className={`input-add mb-6  ${errors.title && "input-error"}`}
          placeholder="Title of the book"
          type="text"
          id="title"
          name="title"
          {...register("title", {
            validate: (value) => value.length > 0,
          })}
        />
        {errors.title && (
          <p className="text-sm ml-2 mt-2 text-gray-light">Field is required</p>
        )}

        <input
          className={`input-add ${errors.author && "input-error"}`}
          placeholder="Author of the book"
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

        <div className="w-full flex justify-between lptpXS:flex-col">
          <div className="flex flex-col w-1/5  lptpXS:w-full">
            <p className="text-gray-addtext mt-6 lptpXL:mt-4 lptpXL:text-sm lptpXS:text-xs lptpXS:ml-2">
              Select year:
            </p>
            <Controller
              name="year"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    className="reactSelect"
                    name="year"
                    placeholder="Year"
                    options={yearOptions}
                    {...register("year", {
                      validate: (value) => value !== undefined,
                    })}
                    {...field}
                  />
                );
              }}
            />
          </div>
          <div className="flex flex-col w-2/3  lptpXS:w-full">
            <p className="text-gray-addtext mt-6 lptpXL:mt-4 lptpXL:text-sm lptpXS:text-xs lptpXS:ml-2">
              Select genres:
            </p>
            <Controller
              name="genres"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    className="reactSelect"
                    name="genres"
                    placeholder="Genres"
                    options={genresOptions}
                    isMulti
                    {...register("genres", {
                      validate: (value) => value !== undefined,
                    })}
                    {...field}
                  />
                );
              }}
            />
          </div>
        </div>
        <textarea
          className={`textarea-add mt-6 h-96 ${
            errors.description && "textarea-error"
          }`}
          placeholder="Description"
          {...register("description", {
            validate: (value) => value.length > 100 && value.length < 1000,
          })}
        ></textarea>

        <p className="text-gray-addtext mt-6 lptpXL:mt-0 lptpXL:mb-0 lptpXL:text-sm lptpXS:text-xs">
          Book’s cover’s picture:
        </p>

        <div className="flex items-center">
          {isFilePicked ? (
            fileData.data ? (
              <MediaFieldFilled
                type={fileData.data.image.extension}
                title={fileData.data.image.filename}
                size={bytesToSize(fileData.data.size)}
                link={fileData.data.url}
                func={deletePictureData}
              />
            ) : (
              <Loader type="ThreeDots" color="#9A86B5" height={20} width={20} />
            )
          ) : (
            <MediaFieldEmpty func={changeHandler} isMobile={isMobile} />
          )}
        </div>

        <PublicationSuccess isPublished={isPublished} />
      </form>
    </Base>
  );
}
