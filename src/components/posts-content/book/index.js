import React from "react";
import BookInfo from "./info";
import Footer from "./footer";

export default function BookContent({ object }) {
  return (
    <>
      <BookInfo object={object} />
      <Footer />
    </>
  );
}
