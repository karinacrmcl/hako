import { createContext, useContext } from "react";

export const ProfileUserCategoriesContext = createContext({
  setProfileActiveCategories: () => null,
  profileActiveCategories: "all",
});

export const useProfileCategories = () =>
  useContext(ProfileUserCategoriesContext);
