import React from "react";
import Base from "../base-modal";
import Content from "./content";

export default function AddArticle({ user }) {
  return (
    <>
      <Base
        category="Article"
        content={<Content user={user} />}
        categoryKey="modalAddArticle"
      ></Base>
    </>
  );
}
