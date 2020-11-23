const Center = ({ children }) => {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Center;
