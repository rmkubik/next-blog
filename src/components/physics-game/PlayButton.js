import { useState } from "react";

import gamifyElement from "../../services/physics-game/gamifyElement";
import Icon from "../Icon";

const PlayButton = ({ target }) => {
  const [show, setShow] = useState(true);

  return show ? (
    <button
      onClick={(event) => {
        const parentElement = target ?? event.target.closest("section");

        gamifyElement(parentElement);

        setShow(false);
      }}
      type="button"
    >
      <Icon>{"▶️"}</Icon>
    </button>
  ) : // eslint-disable-next-line unicorn/no-null
  null;
};

export default PlayButton;
