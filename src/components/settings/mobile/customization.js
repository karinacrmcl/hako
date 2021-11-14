import React from "react";
import { useModal } from "../../../context/modal-context";
import Content from "../tabs";

export default function CustomizationSettingsMobile() {
  return (
    <div className="w-screen h-screen bg-white fixed z-150 top-0 slide-in-right ">
      <Content category={"customization"} />
    </div>
  );
}
