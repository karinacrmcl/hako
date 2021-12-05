import React from "react";
import { useModal } from "../../../hooks/use-modal";
import Content from "../content";

export default function UserProfileSettingsMobile() {
  return (
    <div className="w-screen h-screen bg-white fixed z-150 top-0 slide-in-right ">
      <Content category={"user-profile"} />
    </div>
  );
}
