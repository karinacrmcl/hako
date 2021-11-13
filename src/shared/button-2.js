import React from "react";

export default function ButtonSecond({ func }) {
  return (
    <button
      onClick={func}
      className="bg-gradient-to-r p-1 px-4 demoGradient text-xl font-semibold text-white rounded-lg transition-all "
    >
      Post
    </button>
  );
}
