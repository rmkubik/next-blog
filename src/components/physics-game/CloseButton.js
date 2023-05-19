import Icon from "../Icon";

const CloseButton = ({ destroyGame }) => {
  return (
    <button
      onClick={(event) => {
        console.log("click on close button");
        destroyGame();
      }}
      type="button"
    >
      <Icon>{"❌"}</Icon>
    </button>
  );
};

export default CloseButton;
