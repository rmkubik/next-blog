import { Children, cloneElement, useMemo } from "react";

import useFilter from "../services/useFilter";

const findChildByType = (children, type) => {
  for (const child of Children.toArray(children)) {
    if (child.type === type) {
      return child;
    }
  }

  return undefined;
};

const Header = ({ children }) => {
  return children;
};

const FilterList = ({ children }) => {
  const { filter } = useFilter();

  const ul = findChildByType(children, "ul");
  const header = findChildByType(children, Header);

  if (!ul) {
    throw new Error("FilterList needs a ul child component.");
  }

  const filteredChildren = useMemo(() => {
    return Children.toArray(ul.props.children).filter((child) => {
      if (filter === undefined) {
        return true;
      }

      if (child.type !== "li") {
        // We only want to deal with li children
        // MDX parsing can result in \n and other
        // unexpected strings as ul children.
        return false;
      }

      return child.props?.children.includes?.(filter);
    });
  }, [ul, filter]);

  // Hide this list if no children match
  // the filter.
  if (!filteredChildren.length) {
    return undefined;
  }

  const newUl = cloneElement(ul, {
    children: filteredChildren,
  });

  return (
    <>
      {header}
      {newUl}
    </>
  );
};

FilterList.Header = Header;
export default FilterList;
