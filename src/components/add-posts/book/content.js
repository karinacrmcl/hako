import React, { useEffect, useState } from "react";
// import { MediaFieldEmpty } from "../news/addmedia-cont";
import { addPublication } from "../../../services/firebase";
import PublicationSuccess from "../publication-success";
import ButtonSecond from "../../../shared/button-2";
import Loader from "react-loader-spinner";

export default function Content({ user }) {
  const bookGenres = [
    { id: 1, genreTitle: "Action and adventure", isSelected: false },
    { id: 2, genreTitle: "Alternate history", isSelected: false },
    { id: 3, genreTitle: "Anthology", isSelected: false },
    { id: 4, genreTitle: "Chick lit", isSelected: false },
    { id: 5, genreTitle: "Children's", isSelected: false },
    { id: 6, genreTitle: "Classic", isSelected: false },
    { id: 7, genreTitle: "Comic book", isSelected: false },
    { id: 8, genreTitle: "Coming-of-age", isSelected: false },
    { id: 9, genreTitle: "Crime", isSelected: false },
    { id: 10, genreTitle: "Drama", isSelected: false },
    { id: 11, genreTitle: "Fairytale", isSelected: false },
    { id: 12, genreTitle: "Fantasy", isSelected: false },
    { id: 13, genreTitle: "Graphic novel", isSelected: false },
    { id: 14, genreTitle: "Historical fiction", isSelected: false },
    { id: 15, genreTitle: "Horror", isSelected: false },
    { id: 16, genreTitle: "Mystery", isSelected: false },
    { id: 17, genreTitle: "Paranormal romance", isSelected: false },
    { id: 18, genreTitle: "Poetry", isSelected: false },
    { id: 19, genreTitle: "Political thriller", isSelected: false },
    { id: 20, genreTitle: "Romance", isSelected: false },
    { id: 21, genreTitle: "Satire", isSelected: false },
    { id: 22, genreTitle: "Science fiction", isSelected: false },
    { id: 23, genreTitle: "Art/architecture", isSelected: false },
    { id: 24, genreTitle: "Biography", isSelected: false },
    { id: 25, genreTitle: "Business/economics", isSelected: false },
    { id: 26, genreTitle: "Crafts/hobbies", isSelected: false },
    { id: 27, genreTitle: "Cookbook", isSelected: false },
    { id: 28, genreTitle: "Diary", isSelected: false },
    { id: 29, genreTitle: "Dictionary", isSelected: false },
    { id: 30, genreTitle: "Encyclopedia", isSelected: false },
    { id: 31, genreTitle: "History", isSelected: false },
    { id: 32, genreTitle: "Health/fitness", isSelected: false },
    { id: 33, genreTitle: "Humor", isSelected: false },
    { id: 34, genreTitle: "Philosophy", isSelected: false },
    {
      id: 35,
      genreTitle: "Religion, spirituality, and new age",
      isSelected: false,
    },
    { id: 36, genreTitle: "Textbook", isSelected: false },
    { id: 37, genreTitle: "True crime", isSelected: false },
    { id: 38, genreTitle: "Review", isSelected: false },
    { id: 39, genreTitle: "Science", isSelected: false },
    { id: 40, genreTitle: "Self help", isSelected: false },
    { id: 41, genreTitle: "Sports and leisure", isSelected: false },
    { id: 42, genreTitle: "Travel", isSelected: false },
  ];

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

  const [isPublished, setIsPublished] = useState(false);

  const removeItem = (id) => {
    let newArray = selectedGenres.filter((genre) => genre.id !== id);
    setSelectedGenres(newArray);
  };

  const [booksTitle, setBooksTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isFilePicked, setIsFilePicked] = useState(false);

  //media states
  const [selectedFile, setSelectedFile] = useState();
  const [fileData, setFileData] = useState({});

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
      //post article proto
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

      //add to db and clean fields
      addPublication(post);
      setBooksTitle("");
      setAuthor("");
      setSelectedYear("");
      setSelectedGenres([]);
      setDescription("");
      setFileData({});
      setIsFilePicked(false);
      setSelectedFile(null);
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

  function bytesToSize(bytes) {
    let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }

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
      ).then((response) => response.json().then(setFileData));
    };
  }

  const MediaFieldFilled = ({ type, title, size }) => {
    return (
      <div className="border border-default-first w-uploadSmall h-uploadSmall flex items-center rounded-lg p-3 mt-2 mr-4 select-none relative">
        <button
          className="bg-white p-1 absolute -right-2 -top-2 rounded-full border border-default-first"
          onClick={() => {
            setFileData({});
            setIsFilePicked(false);
            setSelectedFile(null);
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
    );
  };

  const MediaFieldEmpty = () => {
    return (
      <div className="relative w-uploadSmall">
        <input
          className="cursor-pointer border border-dashed border-default-first w-uploadSmall h-uploadSmall flex items-center rounded-lg p-0.5 mt-2 mr-4 cursor-pointer justify-center transition-all opacity-80 hover:opacity-100 file-select"
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
    );
  };

  const symbolsLimit = 1000;

  return (
    <div className="flex-col flex h-full py-10 relative">
      <input
        className="input-add mt-6"
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
      <div className="w-full flex justify-between">
        <div className="flex flex-col">
          <p className="text-gray-addtext mt-6">Year of issue:</p>
          <span className="flex border border-gray-genres rounded-lg px-2 h-8 flex items-center justify-between mt-4 select-none cursor-pointer">
            <p>{selectedYear}</p>
            <button
              onClick={() => {
                setOpenSelectYear(!openSelectYear);
              }}
              className="relative"
            >
              <svg
                width="18"
                height="14"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1H12"
                  stroke="#B8B8B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 5H12"
                  stroke="#B8B8B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 9H12"
                  stroke="#B8B8B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {openSelectYear ? (
                <div className="absolute rounded-lg w-40 h-40 flex flex-col shadow-xl overflow-auto  bg-white">
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
              ) : null}
            </button>
          </span>
        </div>

        <div className="flex flex-col w-2/3 ">
          <p className="text-gray-addtext mt-6">Select genres:</p>
          <span className="flex border justify-between border-gray-genres rounded-lg p-1 h-auto flex items-center mt-2 ">
            <div className="flex genres-container items-center overflow-auto overflow-y-hidden h-8">
              {selectedGenres.map((genre) => {
                if (!genre.isSelected) {
                  return (
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
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 8 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L4 4M7 7L4 4M4 4L7 1M4 4L1 7"
                            stroke="#777777"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                }
              })}
            </div>
            <button
              onClick={() => {
                setOpenSelectGenre(!openSelectGenre);
              }}
              className="relative"
            >
              <svg
                width="18"
                height="14"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1H12"
                  stroke="#B8B8B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 5H12"
                  stroke="#B8B8B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M1 9H12"
                  stroke="#B8B8B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              {openSelectGenre ? (
                <div className="absolute rounded-lg w-96 flex flex-col shadow-xl sorting-genres bg-white">
                  {bookGenres.map((item) => {
                    return (
                      <div
                        className={`flex items-center text-sm px-2 py-2 select text-left relative cursor-pointer `}
                        key={item.id}
                        onClick={() => {
                          setSelectedGenres([...selectedGenres, item]);
                        }}
                      >
                        {item.genreTitle}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </button>
          </span>
        </div>
      </div>
      <textarea
        className="textarea-add mt-6 h-44"
        placeholder="Description"
        value={description}
        onChange={({ target }) => {
          setDescription(target.value);
        }}
      ></textarea>
      <p
        className={`flex justify-end mt-1 ${
          description.length <= symbolsLimit
            ? `text-gray-extralight`
            : `text-red-primary`
        }`}
      >
        {description.length}/{symbolsLimit}
      </p>

      <p className="text-gray-addtext mt-6">Book’s cover’s picture:</p>

      <div className="flex items-center">
        {isFilePicked ? (
          fileData.data ? (
            <MediaFieldFilled
              type={fileData.data.image.extension}
              title={fileData.data.image.filename}
              size={bytesToSize(fileData.data.size)}
            />
          ) : (
            <Loader type="ThreeDots" color="#9A86B5" height={20} width={20} />
          )
        ) : (
          <MediaFieldEmpty />
        )}
      </div>
      <div
        className="absolute right-0 -bottom-10"
        onClick={(e) => savePostData(e)}
      >
        <ButtonSecond />
      </div>
      <PublicationSuccess isPublished={isPublished} />
    </div>
  );
}
