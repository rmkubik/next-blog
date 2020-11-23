const BlockQuote = ({ children }) => {
  return (
    <>
      <blockquote>{children}</blockquote>
      <style jsx>{`
        blockquote {
          border-left: 4px solid gray;

          margin-block-start: 2em;
          margin-block-end: 2em;

          padding-inline-start: 40px;
          margin-inline-start: 0;

          line-height: 1.5em;

          font-style: italic;
        }
      `}</style>
    </>
  );
};

export default BlockQuote;