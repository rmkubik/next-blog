import React, { useContext } from "react";

const FrontmatterContext = React.createContext();

const FrontmatterContextProvider = FrontmatterContext.Provider;

const useFrontmatter = () => useContext(FrontmatterContext);

export { FrontmatterContextProvider, useFrontmatter };
