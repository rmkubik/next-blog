const Section = ({ children, area, className, backgroundColor = "white" }) => {
  return (
    <>
      <section
        className={className}
        style={{
          gridArea: area,
        }}
      >
        {/* <span>🔗</span> */}
        {children}
      </section>
      <style jsx>{`
        section {
          background-color: ${backgroundColor};
        }
      `}</style>
      <style jsx>{`
        section {
          border: 2px solid black;
          box-shadow: black 4px 4px;
          padding: 2rem 4rem;

          // screen size xs
          @media (max-width: 500px) {
            padding: 1rem 2rem;
          }

          // screen size 2xs
          @media (max-width: 375px) {
            padding: 1rem 1rem;
          }

          /* background-color: #fff4db; */

          & > :global(:first-child) {
            margin-top: 0;
          }

          & > :global(p) {
            line-height: 1.5;
          }

          & > :global(a) {
            margin-left: 1rem;
            color: black;
            text-decoration: none;
            cursor: pointer;
          }

          :global(span.external-arrow) {
            margin-left: 1rem;
          }

          & > :global(a:hover) {
            text-decoration: underline;
          }

          :global(iframe) {
            max-width: 100%;
            margin-left: auto;
            margin-right: auto;
            display: block;
          }
        }
      `}</style>
    </>
  );
};

export default Section;
