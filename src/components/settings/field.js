import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function Field({ value, title, id }) {
  const [newValue, setNewValue] = useState({ value });

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  function editData(e) {
    e.preventDefault();
  }

  const EditBtn = () => {
    return (
      <button
        className="mb-4"
        onClick={(e) => {
          editData(e);
        }}
      >
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2 lptpXS:w-3 lptpXS:h-3"
        >
          <path
            d="M6.9448 2.21814L9.9631 5.23643L3.409 11.7905L0.717948 12.0876C0.357696 12.1274 0.0533201 11.8228 0.0934005 11.4626L0.392825 8.76964L6.9448 2.21814ZM11.8299 1.76877L10.4127 0.351567C9.97064 -0.0904964 9.25367 -0.0904964 8.81161 0.351567L7.47834 1.68483L10.4966 4.70313L11.8299 3.36986C12.272 2.92756 12.272 2.21083 11.8299 1.76877Z"
            fill="#262626"
          />
        </svg>
      </button>
    );
  };

  return (
    <div className="text-lg font-regular mt-2 flex items-end lptpXS:mt-1 settingsBP:w-full">
      {newValue != undefined ? (
        <div className="flex flex-col settingsBP:w-full">
          <p className="text-sm font-medium lptpXS:text-xs"> {title} </p>
          <input
            className="changable-input border mt-1 mb-2 rounded-lg border-primary p-2 h-8 lptpXL:h-7 lptpXL:text-base lptpXS:text-sm lptpXS:h-6 lptpXS:w-44 border-settings-mobile settingsBP:w-full"
            value={newValue}
            id={id}
            onChange={({ target }) => {
              setNewValue(target.value);
            }}
          />
        </div>
      ) : (
        <Skeleton width={150} height={25} />
      )}
      <EditBtn />
    </div>
  );
}
