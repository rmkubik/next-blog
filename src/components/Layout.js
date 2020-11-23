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
            padding: 20px;

            max-width: 850px;
            margin: 0 auto;

            :global(header) {
              margin-bottom: 32px;
            }
          }
        `}
      </style>
    </>
  );
};

export default Wrapper;
