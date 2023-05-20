import Icon from "../Icon";

const CloseButton = ({ destroyGame }) => {
  return (
    <button onClick={destroyGame} type="button">
      <Icon>{"❌"}</Icon>
    </button>
  );
};

export default CloseButton;
