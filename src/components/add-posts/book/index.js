import React, { useState } from "react";
import Base from "../base-modal";
import Content from "../book/content";

export default function AddBook({ user }) {
  return (
    <Base category="Books" categoryKey="modalAddBook">
      <Content user={user} />
    </Base>
  );
}
