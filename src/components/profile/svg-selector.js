import React from "react";

export default function SvgSelector({ id }) {
  switch (id) {
    case "plus":
      return;

    default:
      return <p></p>;
      break;
  }
}
