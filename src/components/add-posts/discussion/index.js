import React, { useState } from "react";
import Base from "../base-modal";
import Content from "../discussion/content";

export default function AddDiscussion({ user }) {
  return (
    <Base category="Discussion" categoryKey="modalAddDiscussion">
      <Content user={user} />
    </Base>
  );
}
