import { useRef, useState } from "react";

import gamifyElement from "../../services/physics-game/gamifyElement";
import Icon from "../Icon";

import CloseButton from "./CloseButton";

const PlayButton = ({ target }) => {
  const [show, setShow] = useState(true);
  const [destroyGame, setDestroyGame] = useState();

  return show ? (
    <button
      onClick={(event) => {
        const parentElement = target ?? event.target.closest("section");

        const newDestroyGame = gamifyElement(parentElement);

        setDestroyGame(newDestroyGame);
        setShow(false);
      }}
      type="button"
    >
      <Icon>{"▶️"}</Icon>
    </button>
  ) : (
    <CloseButton destroyGame={destroyGame} />
  );
};

export default PlayButton;
