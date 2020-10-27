import { useRef } from "react";

const ListItem = ({ children }) => {
  const liRef = useRef();

  const onClick = () => {
    liRef.current.querySelector("a")?.click();
  };

  if (Array.isArray(children)) {
    return (
      <li onClick={onClick} onKeyPress={onClick} ref={liRef}>
        <p>{children[0]}</p>
        {children.slice(1)}
      </li>
    );
  }

  return (
    <li onClick={onClick} onKeyPress={onClick} ref={liRef}>
      {children}
    </li>
  );
};

export default ListItem;
