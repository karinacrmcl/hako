import React from "react";
import useUser from "../../../hooks/use-user";

import "react-circular-progressbar/dist/styles.css";
import { UserProfile } from "./user-profile";
import Customization from "./customization";
import Privacy from "./privacy";
import { About } from "./about";
import Help from "./help";

export default function Content({ category }) {
  const { user } = useUser();

  function contentByCategory(category) {
    switch (category) {
      case "user-profile":
        return <UserProfile user={user} />;
      case "customization":
        return <Customization />;
      case "privacy":
        return <Privacy />;
      case "help":
        return <Help />;
      case "about":
        return <About />;
      default:
        break;
    }
  }
  return <div>{contentByCategory(category)}</div>;
}
