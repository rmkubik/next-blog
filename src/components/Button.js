const Button = ({ children, disabled, onClick, label, className }) => {
  if (!label) {
    console.warn("Button needs a label to be accessible.");
  }

  return (
    <>
      <button
        className={className}
        disabled={disabled}
        onClick={onClick}
        type="button"
      >
        {children}
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
          transition-duration: 120ms;
          transition-timing-function: cubic-bezier(0.5, 0.1, 0.25, 1);

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

export default Button;
