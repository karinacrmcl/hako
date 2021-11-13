import React from "react";
import { Links } from "./links";

export default function Menu() {
  return (
    <div className=" select-none py-3 px-6 w-menu h-12 flex items-center bg-white rounded-lg shadow-xl font-fontbasic fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10">
      <Links />
    </div>
  );
}
