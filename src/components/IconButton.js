const IconButton = ({ children, disabled, onClick, label }) => {
  if (!label) {
    console.warn("IconButton needs a label to be accessible.");
  }

  return (
    <>
      <button disabled={disabled} onClick={onClick} type="button">
        <span aria-label={label} role="img">
          {children}
        </span>
      </button>
      <style jsx>{`
        button {
          background: white;
          border: 1px solid black;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 1px 1px 0 black;

          transition-property: transform, box-shadow;
          transition-duration: 180ms;
          transition-timing-function: ease-out;

          &:disabled {
            cursor: not-allowed;
          }

          span {
            font-size: 1.5rem;
          }

          &:hover:not(:disabled) {
            transform: scale(1.05);
            box-shadow: 2px 2px 0 black;
          }
        }
      `}</style>
    </>
  );
};

export default IconButton;
