import React from "react";
import Base from "../base-modal";
import Content from "./content";

export default function AddPhotoModal({ user }) {
  return (
    <Base category="Photography" categoryKey="modalAddPhoto">
      <Content user={user} />
    </Base>
  );
}
