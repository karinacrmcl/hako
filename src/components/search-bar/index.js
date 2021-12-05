import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getAllUsers } from "../../services/firebase";
import SearchList from "./searchlist";

export default function SearchBar() {
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [listVisible, setListVisible] = useState(false);
  const [foundUsers, setfoundUsers] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: "650px" });

  function searchUsersByUsername(target) {
    let searchValue = target.value.toLowerCase();
    let newarr = usersArray.filter((user) => {
      return user.username.toLowerCase().includes(searchValue);
    });
    setfoundUsers(newarr);
  }

  function showSuggestionsList(target) {
    if (target.value != "") {
      setListVisible(true);
    } else {
      setListVisible(false);
    }
  }

  const [usersArray, setUsersArray] = useState([]);

  useEffect(() => {
    async function formAllUsersArray() {
      const usersArray = await getAllUsers();
      setUsersArray(usersArray);
    }
    formAllUsersArray();
  }, []);

  return (
    <div className="flex flex-col relative">
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Type to search here..."
          className={`w-80 lptpXS:w-72 h-9 lptpXS:p-2 p-4 rounded-lg text-sm lptpXS:text-xs outline-none mobileXL:h-8 mobileSM:w-60 ${
            isMobile ? "searchbar-mobile" : "searchbar"
          } `}
          value={searchValue}
          onChange={({ target }) => {
            setSearchValue(target.value);
            showSuggestionsList(target);
            searchUsersByUsername(target);
          }}
        />
        <button
          onMouseEnter={() => {
            setHoveredBtn(true);
          }}
          onMouseLeave={() => {
            setHoveredBtn(false);
          }}
          className="bg-none z-100 w-6 h-2/3 -ml-8"
        >
          {hoveredBtn ? (
            <svg
              width="19"
              height="21"
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex items-center justify-center ml-1 mobileXL:h-14 mobileXL:w-4.5"
            >
              <path
                d="M13 14L18 20"
                stroke="url(#paint0_linear)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="url(#paint1_linear)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient
                  id="paint0_linear"
                  x1="15.5"
                  y1="14"
                  x2="15.5"
                  y2="20"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#B7BBCE" />
                  <stop offset="1" stopColor="#9A86B5" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear"
                  x1="8"
                  y1="0"
                  x2="8"
                  y2="16"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#D3EEE6" />
                  <stop offset="1" stopColor="#B7BBCE" />
                </linearGradient>
              </defs>
            </svg>
          ) : (
            <svg
              width="19"
              height="21"
              viewBox="0 0 19 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex items-center justify-center ml-1 mobileXL:h-14 mobileXL:w-4.5"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke={`${isMobile ? "#CFCFCF" : "#E1E1E1"} `}
                strokeWidth="2"
              />
              <path
                d="M13 14L18 20"
                stroke={`${isMobile ? "#CFCFCF" : "#E1E1E1"} `}
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          )}
        </button>
      </div>
      {listVisible && <SearchList users={foundUsers} />}
    </div>
  );
}
