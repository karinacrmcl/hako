import React from "react";

export default function SymbolsLimit({ length, limit }) {
  return (
    <p
      className={`flex justify-end mt-1 lptpXL:text-sm ${
        length <= limit ? `text-gray-extralight` : `text-red-primary`
      }`}
    >
      {length}/{limit}
    </p>
  );
}
