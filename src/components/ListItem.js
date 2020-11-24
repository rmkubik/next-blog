import { useRef } from "react";

const StyledListItem = ({ children, onClick, ref }) => (
  <>
    <li onClick={onClick} onKeyPress={onClick} ref={ref}>
      {children}
    </li>
    <style jsx>{`
      li {
        padding: 0.5rem;
        border: 2px black solid;
        border-radius: 4px;
        background-color: white;
        display: flex;
        margin: 0.5rem 0;

        & > :global(*) {
          margin: 0;
        }

        & > :global(*:first-child) {
          flex: 1;
        }

        :global(a) {
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

          :global(a) {
            text-decoration: underline;
          }
        }
      }
    `}</style>
  </>
);

const ListItem = ({ children }) => {
  const liRef = useRef();

  const onClick = () => {
    liRef.current.querySelector("a")?.click();
  };

  if (Array.isArray(children)) {
    return (
      <StyledListItem onClick={onClick} onKeyPress={onClick} ref={liRef}>
        <p>{children[0]}</p>
        {children.slice(1)}
      </StyledListItem>
    );
  }

  return (
    <StyledListItem onClick={onClick} onKeyPress={onClick} ref={liRef}>
      {children}
    </StyledListItem>
  );
};

export default ListItem;
