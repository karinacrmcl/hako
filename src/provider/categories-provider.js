import React, { useState } from "react";
import { CategoriesContext } from "../context/categories-selected";

export default function CategoriesProvider({ children, ...props }) {
  const [activeCategories, setActiveCategories] = useState({
    article: true,
    photography: true,
    discussion: true,
    news: true,
    book: true,
    hot: true,
  });
  return (
    <CategoriesContext.Provider
      value={{ activeCategories, setActiveCategories }}
      {...props}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
