import Icon from "../Icon";

const CloseButton = ({ destroyGame }) => {
  return (
    <>
      <button onClick={destroyGame} type="button">
        <Icon>{"❌"}</Icon>
      </button>
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
