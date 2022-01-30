import useTheme from "../services/useTheme";

const Section = ({ children, area, className, backgroundColor }) => {
  const { theme } = useTheme();

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
          background-color: ${backgroundColor
            ? backgroundColor
            : theme.sectionColor};
        }
      `}</style>
      <style jsx>{`
        section {
          border: 2px solid ${theme.borderColor};
          box-shadow: 4px 4px ${theme.borderShadowColor};
          padding: 2rem 4rem;

          /* background-color: #fff4db; */

          & > :global(:first-child) {
            margin-top: 0;
          }

          & > :global(p) {
            line-height: 1.5;
          }

          & > :global(a) {
            margin-left: 1rem;
            color: ${theme.fontColor};
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
