import IconButton from "../IconButton";

const CloseButton = ({ destroyGame, disabled }) => {
  return (
    <>
      <IconButton
        disabled={disabled}
        label="Close button"
        onClick={destroyGame}
        type="button"
      >
        {"❌"}
      </IconButton>
      <style jsx>
        {`
          button {
            position: relative;
            z-index: 1;
          }
        `}
      </style>
    </>
  );
};

export default CloseButton;
