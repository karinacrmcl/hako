import React, { useEffect, useState } from "react";

import PublicationSuccess from "../publication-success";
import Loader from "react-loader-spinner";
import { MediaFieldEmpty } from "../media-field-empty";
import ButtonFilled from "../../../shared/components/button-filled";

import { addPublication } from "../../../services/firebase";
import { useMediaQuery } from "react-responsive";
import { bytesToSize } from "../../../utils/format-bytes";

import { bookGenres } from "../../../constants/book-genres";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import { MediaFieldFilled } from "./media-field-filled";
import SvgSelector from "../svg-selector";
import { savePicturedata } from "../../../utils/save-picture-data";
import SymbolsLimit from "../symbols-limit";

export default function Content({ user }) {
  let yearStart = 1950;
  let yearEnd = new Date().getFullYear();

  let yearsArr = [];

  while (yearStart < yearEnd + 1) {
    yearsArr.push(yearStart++);
  }

  const [openSelectGenre, setOpenSelectGenre] = useState(false);
  const [openSelectYear, setOpenSelectYear] = useState(false);

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const [booksTitle, setBooksTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [isPublished, setIsPublished] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);

  const [selectedFile, setSelectedFile] = useState();
  const [fileData, setFileData] = useState({});

  const isMobile = useMediaQuery({ maxWidth: "1024px" });

  console.log(fileData);

  function removeItem(id) {
    let newArray = selectedGenres.filter((genre) => genre.id !== id);
    setSelectedGenres(newArray);
  }

  function savePostData() {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    if (
      booksTitle &&
      author &&
      selectedYear &&
      selectedGenres &&
      description &&
      description.length <= symbolsLimit
    ) {
      const post = {
        category: "Books recomendations",
        dateCreate: new Date().toLocaleDateString("en-US", options),
        id: new Date().getTime().toString(),
        booksTitle,
        author,
        year: selectedYear,
        genres: selectedGenres,
        description,
        type: "book",
        coverPhoto: fileData.data.url,
        userId: user.uid,
        comments: [],
      };

      addPublication(post);
      setBooksTitle("");
      setAuthor("");
      setSelectedYear("");
      setSelectedGenres([]);
      setDescription("");
      setFileData({});
      setIsFilePicked(false);
      setSelectedFile(null);
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

  function renderList() {
    return bookGenres.map((item) => {
      return (
        selectedGenres.filter((e) => e.id === item.id).length === 0 && (
          <div
            className={`flex items-center text-sm px-2 py-2 select text-left relative cursor-pointer `}
            key={item.id}
            onClick={() => {
              setSelectedGenres([...selectedGenres, item]);
            }}
          >
            {item.genreTitle}
          </div>
        )
      );
    });
  }

  const symbolsLimit = 1000;

  return (
    <div className="flex-col flex h-full py-10 relative lptpXL:py-5">
      <input
        className="input-add mt-6 lptpXL:mt-0"
        placeholder="Book’s title.."
        value={booksTitle}
        onChange={({ target }) => {
          setBooksTitle(target.value);
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

      <div className="w-full flex justify-between lptpXS:flex-col">
        {isMobile ? (
          <input
            className="input-add mt-6"
            placeholder="Year.."
            value={selectedYear}
            onChange={({ target }) => {
              setSelectedYear(target.value);
            }}
          ></input>
        ) : (
          <div className="flex flex-col">
            <p className="text-gray-addtext mt-6 lptpXL:mt-4 lptpXL:text-sm">
              Year of issue:
            </p>
            <span className="flex border border-gray-genres rounded-lg px-2 py-2 flex items-center justify-between mt-1.5 select-none cursor-pointer h-11 lptpXL:h-9 lptpXL:py-1 lptpXL:px-1">
              <p>{selectedYear}</p>
              <button
                onClick={() => {
                  setOpenSelectYear(!openSelectYear);
                }}
                className="relative"
              >
                <SvgSelector id="bar" />
                {openSelectYear && (
                  <div className="absolute rounded-lg w-40 h-40 flex flex-col shadow-xl overflow-auto bg-white z-100">
                    {yearsArr.map((item) => {
                      return (
                        <div
                          className="flex items-center text-sm px-2 py-2 select text-left relative cursor-pointer "
                          key={item}
                          onClick={() => {
                            setSelectedYear([item]);
                          }}
                        >
                          {item}
                        </div>
                      );
                    })}
                  </div>
                )}
              </button>
            </span>
          </div>
        )}

        <div className="flex flex-col w-2/3  lptpXS:w-full">
          <p className="text-gray-addtext mt-6 lptpXL:mt-4 lptpXL:text-sm lptpXS:text-xs lptpXS:ml-2">
            Select genres:
          </p>

          {isMobile ? (
            <span className="mt-1.5 flex items-center w-full">
              <button
                className="bg-default-first rounded-full p-1 w-5 h-5"
                onClick={() => {
                  setOpenSelectGenre(!openSelectGenre);
                }}
              >
                {openSelectGenre ? (
                  <SvgSelector id="cancel-white" />
                ) : (
                  <SvgSelector id="plus-white" />
                )}
              </button>
              <Swiper
                spaceBetween={5}
                centeredSlides
                className="flex w-full p-1 ml-2 "
              >
                {selectedGenres.map((genre) => {
                  if (!genre.isSelected) {
                    return (
                      <SwiperSlide>
                        <div
                          className="bg-white shadow-genre-mobile text-sm text-gray-addtext items-center h-6 px-3 mr-2 flex rounded-full select-none whitespace-nowrap h-full"
                          key={genre.id}
                        >
                          <p className="mr-1.5 text-gray-genreMobile font-medium text-xs">
                            {genre.genreTitle}
                          </p>
                          <button
                            onClick={() => {
                              removeItem(genre.id);
                            }}
                          >
                            <SvgSelector id="cancel-grey" />
                          </button>
                        </div>
                      </SwiperSlide>
                    );
                  }
                })}
              </Swiper>

              {openSelectGenre && (
                <div className="absolute rounded-lg w-96 flex flex-col shadow-xl sorting-genres bg-white z-100 left-8">
                  {renderList()}
                </div>
              )}
            </span>
          ) : (
            <span className="flex border justify-between border-gray-genres rounded-lg p-1 h-auto flex items-center mt-2 lptpXL:h-9 lptpXL:py-1 lptpXL:px-1">
              <div className="flex genres-container items-center overflow-auto overflow-y-hidden h-8">
                {selectedGenres.map((genre) => {
                  !genre.isSelected && (
                    <div
                      className="bg-gray-genresBg text-sm text-gray-addtext items-center h-6 px-3 mr-2 flex rounded-full select-none whitespace-nowrap mb-1 "
                      key={genre.id}
                    >
                      <p className="mr-3"> {genre.genreTitle} </p>
                      <button
                        onClick={() => {
                          removeItem(genre.id);
                        }}
                      >
                        <SvgSelector id="cancel-grey" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  setOpenSelectGenre(!openSelectGenre);
                }}
                className="relative mr-1"
              >
                <SvgSelector id="bar" />
                {openSelectGenre && (
                  <div className="absolute rounded-lg w-96 flex flex-col shadow-xl sorting-genres bg-white z-100 ">
                    {renderList()}
                  </div>
                )}
              </button>
            </span>
          )}
        </div>
      </div>
      <textarea
        className="textarea-add mt-6 h-44 lptpXL:mt-4 "
        placeholder="Description"
        value={description}
        onChange={({ target }) => {
          setDescription(target.value);
        }}
      ></textarea>

      <SymbolsLimit length={description.length} limit={symbolsLimit} />

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
    </div>
  );
}
