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
      {({ className, style, tokens, getLineProps, getTokenProps }) => {
        let editedTokens = tokens;

        /*
         * If the last line of the code block is empty, trim it off.
         * For some reason, an extra line keeps getting added to the
         * end of the block.
         */
        if (
          tokens[tokens.length - 1].length === 0 ||
          (tokens[tokens.length - 1].length === 1 &&
            tokens[tokens.length - 1][0].empty)
        ) {
          editedTokens = tokens.slice(0, tokens.length - 1);
        }

        return (
          <pre
            className={className}
            style={{
              overflowX: "auto",
              padding: "1.25rem",
              ...style,
            }}
          >
            <code>
              {editedTokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({
                    key: i,
                    line,
                  })}
                >
                  {line.map((token, key) => (
                    <span
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
        );
      }}
    </Highlight>
  );
};

export default CodeBlock;
