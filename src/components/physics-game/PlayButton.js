import { useState } from "react";

import gamifyElement from "../../services/physics-game/gamifyElement";
import Icon from "../Icon";

import CloseButton from "./CloseButton";

const PlayButton = ({ target }) => {
  const [show, setShow] = useState(true);
  const [destroyGame, setDestroyGame] = useState();

  return show ? (
    <button
      onClick={(event) => {
        const startGame = async () => {
          const parentElement = target ?? event.target.closest("section");

          const newDestroyGame = await gamifyElement(parentElement);

          setDestroyGame(() => newDestroyGame);
          setShow(false);
        };

        startGame();
      }}
      type="button"
    >
      <Icon>{"▶️"}</Icon>
    </button>
  ) : (
    <CloseButton
      destroyGame={() => {
        setShow(true);
        destroyGame();
      }}
    />
  );
};

export default PlayButton;
