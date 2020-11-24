import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/u, "") : "markup";

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
          </pre>
        );
      }}
    </Highlight>
  );
};

export default CodeBlock;
