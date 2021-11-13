import { useContext } from "react";
import { CategoriesContext } from "../context/categories-selected";

export const useCategories = () => useContext(CategoriesContext);

//:)
