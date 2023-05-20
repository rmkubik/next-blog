import { useState } from "react";

import gamifyElement from "../../services/physics-game/gamifyElement";
import IconButton from "../IconButton";

import CloseButton from "./CloseButton";

const PlayButton = ({ target }) => {
  const [gameState, setGameState] = useState("stopped"); // stopped, starting, playing, stopping
  const [destroyGame, setDestroyGame] = useState();

  const destroy = async () => {
    if (gameState !== "playing") {
      return;
    }

    setGameState("stopping");
    await destroyGame();
    setGameState("stopped");
  };

  if (gameState === "stopped" || gameState === "starting") {
    return (
      <IconButton
        disabled={gameState === "starting"}
        label="Play button"
        onClick={(event) => {
          const startGame = async () => {
            const parentElement = target ?? event.target.closest("section");

            setGameState("starting");

            const newDestroyGame = await gamifyElement(parentElement);

            setDestroyGame(() => newDestroyGame);
            setGameState("playing");
          };

          startGame();
        }}
        type="button"
      >
        {"▶️"}
      </IconButton>
    );
  }

  if (gameState === "playing" || gameState === "stopping") {
    return (
      <CloseButton
        destroyGame={() => {
          destroy();
        }}
        disabled={gameState === "stopping"}
      />
    );
  }

  // eslint-disable-next-line unicorn/no-null
  return null;
};

export default PlayButton;
