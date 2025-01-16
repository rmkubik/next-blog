import Header from "./Header";

/**
 * Media query layout sizes
 * Check src/mediaQuerySizes.md for values.
 */

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

            // screen size sm
            @media (max-width: 640px) {
              padding: 1rem;
            }

            // screen size xs
            @media (max-width: 500px) {
              padding: 0.5rem;
            }

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
