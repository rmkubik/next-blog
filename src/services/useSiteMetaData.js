import React, { useContext, useState } from "react";

const SiteMetaDataContext = React.createContext();

const SiteMetaDataProvider = ({ value, children, ...props }) => {
  const [siteMetaData, setSiteMetaData] = useState(value);

  const mergeSiteMetaData = (newData) => {
    setSiteMetaData({
      ...siteMetaData,
      ...newData,
    });
  };

  return (
    <SiteMetaDataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={[siteMetaData, mergeSiteMetaData]}
      {...props}
    >
      {children}
    </SiteMetaDataContext.Provider>
  );
};

const useSiteMetaData = () => useContext(SiteMetaDataContext);

export default useSiteMetaData;
export { SiteMetaDataProvider };
