import React from "react";
import { Links } from "./links";

export default function Menu() {
  return (
    <div className="select-none py-3 px-6 w-menu h-12 flex items-center bg-white rounded-lg shadow-xl font-fontbasic fixed bottom-6 left-1/2 transform -translate-x-1/2 z-10 lptpXS:py-2 lptpXS:px-1.5 lptpXS:w-auto lptpXS:h-10 mobileXL:w-full mobileXL:bottom-0 mobileXL:menu-mobile mobileXL:justify-center">
      <Links />
    </div>
  );
}
