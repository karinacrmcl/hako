import { createContext } from "react";

export const ProfileUserCategoriesContext = createContext({
  setProfileActiveCategories: () => null,
  profileActiveCategories: "all",
});
