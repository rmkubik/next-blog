import Highlight, { defaultProps } from "prism-react-renderer";

const CodeBlock = ({ children, className }) => {
  const language = className
    ? className.replace(/language-/u, "")
    : "javascript";

  return (
    <Highlight {...defaultProps} code={children} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          style={{
            padding: "20px",
            ...style,
          }}
        >
          {tokens.map((line, i) => (
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
      )}
    </Highlight>
  );
};

export default CodeBlock;
