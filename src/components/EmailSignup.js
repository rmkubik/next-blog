import useTheme from "../services/useTheme";

const EmailSignup = () => {
  const { theme } = useTheme();

  return (
    <>
      <div>
        <input />
        <button type="button">{"Subscribe"}</button>
      </div>
      <style jsx>{`
        div {
          display: flex;
          flex-direction: row;

          & > :global(*:first-child) {
            flex: 1;
            margin-right: 0.5rem;
            padding: 0.5rem;
            border: 2px ${theme.borderColor} solid;
            border-radius: 4px;
            background-color: ${theme.sectionColor};
          }

          & > :global(button) {
            background-color: ${theme.borderColor};
            color: ${theme.sectionColor};
            border: 2px ${theme.borderColor} solid;
            border-radius: 4px;
            cursor: pointer;
          }

          & > :global(button:hover) {
            transform: scale(1.1);
            transition-timing-function: ease-in-out;
            transition-duration: 100ms;
          }
        }
      `}</style>
    </>
  );
};

export default EmailSignup;
