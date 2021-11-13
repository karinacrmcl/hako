import React, { useState } from "react";
import ButtonSecond from "../../../shared/button-2";
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
