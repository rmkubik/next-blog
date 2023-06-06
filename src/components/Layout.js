import Header from "./Header";

/**
 * Media query layout sizes
 * - 2xs: 375px
 * - xs: 500px
 * - sm: 640px
 * - md: 768px
 * - lg: 1024px
 * - xl: 1280px
 * - 2xl: 1536px
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
