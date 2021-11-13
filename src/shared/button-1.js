import React from "react";

export default function ButtonFirst({ func }) {
  return (
    <button
      onClick={func}
      className=" p-1 px-4 text-xl font-semibold text-gradient-from rounded-lg border-btn border-default-first mr-4 transition-all hover:bg-default-first hover:text-white duration-500"
    >
      Cancel
    </button>
  );
}
