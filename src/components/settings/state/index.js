import React from "react";
import Loader from "react-loader-spinner";

export default function StateUpdating() {
  return (
    <div className="select-none absolute bg-gradient-to-r from-gradient-from to-gradient-to update-container rounded-lg flex items-center p-6 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
      <div className="flex items-center ml-3">
        <Loader type="Puff" color="#ffffff" height={50} width={50} />
        <h2 className="text-white font-bold text-xl uppercase leading-none ml-4">
          Updating...
        </h2>
      </div>
    </div>
  );
}
