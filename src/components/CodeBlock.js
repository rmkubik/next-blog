import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/u, "") : "markup";

  // Migrating to MDX v2 from v2, inlineCode component
  // was removed.
  //
  // This means both inline `code`
  // ```js
  // fenced code
  // ```
  // All come through the same code component.
  //
  // There seems to be no good, base way to distinguish
  // between inline and fenced code.
  //
  // Instead, here, we see if the code block has a
  // language className and assume this is a fenced
  // block.
  //
  // If a fenced block does NOT have a language, it
  // still be treated as an inline block erroneously
  // though.
  //
  // This should end up being fine practically since
  // we usually (always?) want to have syntax
  // highlighting on code blocks.
  if (!className) {
    return <code>{children}</code>;
  }

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({
        className: innerClassName,
        style,
        tokens,
        getLineProps,
        getTokenProps,
      }) => {
        let editedTokens = tokens;

        /*
         * If the last line of the code block is empty, trim it off.
         * For some reason, an extra line keeps getting added to the
         * end of the block.
         */
        if (
          tokens.at(-1).length === 0 ||
          (tokens.at(-1).length === 1 && tokens.at(-1)[0].empty)
        ) {
          editedTokens = tokens.slice(0, -1);
        }

        return (
          <>
            <pre className={innerClassName} style={style}>
              <code>
                {editedTokens.map((line, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    {...getLineProps({
                      key: i,
                      line,
                    })}
                  >
                    {line.map((token, key) => (
                      <span
                        // eslint-disable-next-line react/no-array-index-key
                        key={key}
                        {...getTokenProps({
                          key,
                          token,
                        })}
                      />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
            <style jsx>{`
              pre {
                padding: 1.25rem;
                overflow-x: scroll;
                // white-space: pre-wrap;

                // screen size md
                @media (max-width: 768px) {
                  padding: 1rem;
                  font-size: 0.9em;

                  margin-left: -1rem;
                  margin-right: -1rem;
                }

                // screen size xs
                @media (max-width: 500px) {
                  padding: 0.5rem;
                  font-size: 0.8em;
                }

                // screen size 2xs
                @media (max-width: 375px) {
                  margin-left: -0.5rem;
                  margin-right: -0.5rem;
                }
              }
            `}</style>
          </>
        );
      }}
    </Highlight>
  );
};

export default CodeBlock;
