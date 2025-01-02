const Columns = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          column-count: 3;
          column-gap: 1rem;

          // screen size md
          @media (max-width: 768px) {
            column-count: 2;
          }

          // screen size xs
          @media (max-width: 500px) {
            column-count: 1;
          }

          // Children should not have a margin
          // because it will only apply to the
          // first column, not the subsequent.
          & > :global(*) {
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Columns;
