import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getAllUsers } from "../../services/firebase";
import SearchList from "./list";
import SvgSelector from "./svg-selector";

export default function SearchBar() {
  const [hoveredBtn, setHoveredBtn] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [listVisible, setListVisible] = useState(false);
  const [foundUsers, setfoundUsers] = useState([]);
  const [usersArray, setUsersArray] = useState([]);

  const isMobile = useMediaQuery({ maxWidth: "650px" });

  function searchUsersByUsername(target) {
    let searchValue = target.value.toLowerCase();
    let newArr = usersArray.filter((user) => {
      return user.username.toLowerCase().includes(searchValue);
    });
    setfoundUsers(newArr);
  }

  function showSuggestionsList(target) {
    if (target.value != "") {
      setListVisible(true);
    } else {
      setListVisible(false);
    }
  }

  function handleSearch(target) {
    setSearchValue(target.value);
    showSuggestionsList(target);
    searchUsersByUsername(target);
  }

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
            handleSearch(target);
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
            <SvgSelector id="search-hovered" />
          ) : (
            <SvgSelector id="search-hovered" />
          )}
        </button>
      </div>
      {listVisible && <SearchList users={foundUsers} />}
    </div>
  );
}
