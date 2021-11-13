import React, { useState } from "react";
import { ProfileUserCategoriesContext } from "../context/user-profile-categories";

export default function ProfileCategoriesProvider({ children, ...props }) {
  const [profileActiveCategories, setProfileActiveCategories] = useState({
    profileActiveCategories: "all",
  });
  return (
    <ProfileUserCategoriesContext.Provider
      value={{ profileActiveCategories, setProfileActiveCategories }}
      {...props}
    >
      {children}
    </ProfileUserCategoriesContext.Provider>
  );
}
