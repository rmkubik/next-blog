const ListItem = ({ children }) => {
  const liRef = useRef();

  const onClick = () => {
    liRef.current.querySelector("a")?.click();
  };

  if (Array.isArray(children)) {
    return (
      <li ref={liRef} onClick={onClick}>
        <p>{children[0]}</p>
        {children.slice(1)}
      </li>
    );
  } else {
    return (
      <li ref={liRef} onClick={onClick}>
        {children}
      </li>
    );
  }
};

export default ListItem;
