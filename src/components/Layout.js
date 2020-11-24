import Header from "./Header";

const Wrapper = ({ children }) => {
  return (
    <>
      <div>
        <Header />
        {children}
      </div>
      <style jsx>
        {`
          div {
            padding: 2rem;

            max-width: 850px;
            margin: 0 auto;

            :global(header) {
              margin-bottom: 2rem;
            }
          }
        `}
      </style>
    </>
  );
};

export default Wrapper;
