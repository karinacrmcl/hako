import { useContext } from "react";
import { ProfileUserCategoriesContext } from "../context/user-profile-categories";

export const useProfileCategories = () =>
  useContext(ProfileUserCategoriesContext);
