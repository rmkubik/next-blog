const Grid = ({ children, columns = 2, gridGap = "0.5rem" }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
          display: grid;
          grid-gap: ${gridGap};
          grid-template-columns: ${`1fr `.repeat(columns)};
        }
      `}</style>
    </>
  );
};

export default Grid;
