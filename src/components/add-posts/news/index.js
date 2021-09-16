import React, { useState } from "react";
import Base from "../base-modal";
import Content from "../news/content";

export default function AddNews({ user }) {
  return (
    <Base category="News" categoryKey="modalAddNews">
      <Content user={user} />
    </Base>
  );
}
