import React, { useContext } from "react";

const FrontmatterContext = React.createContext();

export const FrontmatterContextProvider = FrontmatterContext.Provider;

export const useFrontmatter = () => useContext(FrontmatterContext);
