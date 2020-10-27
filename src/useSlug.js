import React, { useContext } from "react";

const SlugContext = React.createContext();

export const SlugContextProvider = SlugContext.Provider;

export const useSlug = () => useContext(SlugContext);
