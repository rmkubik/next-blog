import React, { useContext } from "react";

const SlugContext = React.createContext();

const SlugContextProvider = SlugContext.Provider;

const useSlug = () => useContext(SlugContext);

export { SlugContextProvider, useSlug };
