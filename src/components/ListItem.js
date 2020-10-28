import { useRef } from "react";
import styled from "styled-components";

const ListStyles = styled.li`
  padding: 8px;
  border: 2px black solid;
  border-radius: 4px;
  background-color: white;
  display: flex;
  margin: 8px 0;

  & > * {
    margin: 0;
  }

  & > *:first-child {
    flex: 1;
  }

  a {
    color: black;
    text-decoration: none;
  }

  &:hover {
    background-color: aliceblue;
    cursor: pointer;
    animation-name: headShake;
    animation-duration: 800ms;
    animation-timing-function: ease-in-out;
    animation-iteration-count: 1;

    a {
      text-decoration: underline;
    }
  }
`;

const ListItem = ({ children }) => {
  const liRef = useRef();

  const onClick = () => {
    liRef.current.querySelector("a")?.click();
  };

  if (Array.isArray(children)) {
    return (
      <ListStyles onClick={onClick} onKeyPress={onClick} ref={liRef}>
        <p>{children[0]}</p>
        {children.slice(1)}
      </ListStyles>
    );
  }

  return (
    <ListStyles onClick={onClick} onKeyPress={onClick} ref={liRef}>
      {children}
    </ListStyles>
  );
};

export default ListItem;
