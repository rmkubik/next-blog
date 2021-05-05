const BlockQuote = ({ children }) => {
  return (
    <>
      <blockquote>{children}</blockquote>
      <style jsx>{`
        blockquote {
          border-left: 4px solid gray;

          margin-block-start: 2rem;
          margin-block-end: 2rem;

          padding-inline-start: 2.5rem;
          margin-inline-start: 0;

          line-height: 1.5;

          font-style: italic;
        }
      `}</style>
    </>
  );
};

export default BlockQuote;
