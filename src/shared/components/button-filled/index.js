import React from "react";

export default function ButtonFilled({ func }) {
  return (
    <button
      onClick={func}
      className="bg-gradient-to-r p-1 px-4 demoGradient text-xl font-semibold text-white rounded-lg transition-all lptpXL:text-base lptpXL:py-1.5 lptpXL:mb-1 tabletXL:rounded-xl tabletXL:py-1 tabletXL:text-sm mobileXL:text-xs"
    >
      Post
    </button>
  );
}
