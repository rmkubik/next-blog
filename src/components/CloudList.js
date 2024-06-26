import useFilter from "../services/useFilter";

const CloudList = ({ children }) => {
  const listItems = children.props.children;

  return (
    <>
      <ul>{listItems}</ul>
      <style jsx>{`
        ul {
          display: flex;
          flex-flow: row wrap;

          padding: 0;

          list-style: none;

          :global(li) {
            margin: 0.5rem 0.25rem;
            padding: 0.5rem 1rem;
            border: 1px solid black;

            :global(a) {
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
            }

            &:hover {
              transition: 0.2s;
              transition-timing-function: ease-out;
              box-shadow: black 0px 0px 3px;
            }

            &:has(button) {
              padding: 0;
            }
          }
        }
      `}</style>
    </>
  );
};

const FilterButton = ({ children, value }) => {
  const { filter, setFilter } = useFilter();
  const isSelected = filter === value;

  return (
    <>
      <button
        className={isSelected ? "selected" : ""}
        onClick={() => {
          if (isSelected) {
            setFilter(undefined);
          } else {
            setFilter(value);
          }
        }}
        type="button"
      >
        {children}
      </button>
      <style jsx>{`
        button {
          padding: 0.5rem 1rem;
          border: none;
          cursor: pointer;
          background-color: transparent;

          &.selected {
            background-color: aliceblue;
          }
        }
      `}</style>
    </>
  );
};

CloudList.FilterButton = FilterButton;
export default CloudList;
