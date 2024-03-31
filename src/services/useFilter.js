import { useState, useContext, createContext, useMemo } from "react";

const FilterContext = createContext(undefined);

const FilterProvider = ({ children }) => {
  const [filter, setFilter] = useState(undefined);
  const filterMemo = useMemo(() => {
    return {
      filter,
      setFilter,
    };
  }, [filter, setFilter]);

  return (
    <FilterContext.Provider value={filterMemo}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export default useFilter;
export { FilterProvider };
