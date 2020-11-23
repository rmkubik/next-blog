const Section = ({ children, area, color = "white" }) => {
  return (
    <>
      <section
        className={area}
        style={{
          backgroundColor: color,
          gridArea: area,
        }}
      >
        {/* <span>🔗</span> */}
        {children}
      </section>
      <style jsx>{`
        section {
          border: 2px solid black;
          box-shadow: black 4px 4px;
          padding: 32px 64px;
          background-color: white;

          & > :global(:first-child) {
            margin-top: 0;
          }

          & > :global(p) {
            line-height: 1.5;
          }

          & > :global(a) {
            margin-left: 16px;
            color: black;
            text-decoration: none;
            cursor: pointer;
          }

          :global(span.external-arrow) {
            margin-left: 16px;
          }

          & > :global(a:hover) {
            text-decoration: underline;
          }
        }
      `}</style>
    </>
  );
};

export default Section;
