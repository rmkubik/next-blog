const Grid = ({ children, columns = 2 }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: ${`1fr `.repeat(columns)};
        }
      `}</style>
    </>
  );
};

export default Grid;
