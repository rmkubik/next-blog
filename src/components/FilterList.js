import { Children, cloneElement } from "react";

import useFilter from "../services/useFilter";

const FilterList = ({ children }) => {
  const { filter } = useFilter();

  if (children.type !== "ul") {
    return children;
  }

  return cloneElement(children, {
    children: Children.toArray(children.props.children).filter((child) => {
      if (filter === undefined) {
        return true;
      }

      return child.props?.children.includes?.(filter);
    }),
  });
};

export default FilterList;
