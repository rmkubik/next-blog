const EmailSignup = () => {
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
            margin-right: 8px;
            padding: 8px;
            border: 2px black solid;
            border-radius: 4px;
            background-color: white;
          }

          & > :global(button) {
            background-color: black;
            color: white;
            border: 2px black solid;
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
