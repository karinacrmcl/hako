import { createContext } from "react";

export const CategoriesContext = createContext({
  setActiveCategories: () => null,
  activeCategories: {
    article: true,
    photography: true,
    discussion: true,
    news: true,
    book: true,
    hot: true,
  },
});
