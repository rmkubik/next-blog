import attachGameView from "./attachGameView";
import createBall from "./createBall";
import createBounds from "./createBounds";
// createMatterRenderer is only used when we uncomment the
// the matter renderer debugger.
// eslint-disable-next-line no-unused-vars
import createMatterRenderer from "./createMatterRenderer";
import createObstacles from "./createObstacles";
import onMouseDown from "./onMouseDown";
import onMouseMove from "./onMouseMove";
import onMouseUp from "./onMouseUp";

const gamifyElement = async (containerElement) => {
  const Matter = await import("matter-js");
  const PIXI = await import("pixi.js");

  const { Engine, Body, Runner, Query } = Matter;

  const container = containerElement;

  const spanClassName = "obstacle";

  container.style.position = "relative";
  container.style.zIndex = 1;

  const engine = Engine.create();

  engine.gravity.y = 0;

  const app = new PIXI.Application({
    backgroundAlpha: 0,
    height: container.offsetHeight,
    width: container.offsetWidth,
  });

  const gameElement = attachGameView(containerElement, app);

  await createBounds(container, engine);

  const containerBoundingRect = container.getBoundingClientRect();

  const obstacles = await createObstacles({
    app,
    container,
    engine,
    spanClassName,
  });

  const ball = await createBall({
    app,
    engine,
    spawn: {
      x: containerBoundingRect.width - 120,
      y: 60,
    },
  });

  const dragPosRef = { current: undefined };

  container.addEventListener(
    "mousedown",
    onMouseDown({
      ball,
      containerBoundingRect,
      dragPosRef,
      Query,
    })
  );

  document.addEventListener(
    "mousemove",
    onMouseMove({
      ball,
      containerBoundingRect,
      dragPosRef,
      Query,
    })
  );

  const rangeFinderGraphics = new PIXI.Graphics();

  app.stage.addChild(rangeFinderGraphics);

  const rangefinder = {
    graphics: rangeFinderGraphics,
  };

  document.addEventListener(
    "mouseup",
    onMouseUp({
      ball,
      Body,
      containerBoundingRect,
      dragPosRef,
    })
  );

  // eslint-disable-next-line no-unused-vars
  let elapsed = 0;

  app.ticker.add((delta) => {
    elapsed += delta;

    obstacles.forEach((obstacle) => {
      const x = obstacle.body.position.x;
      const y = obstacle.body.position.y;
      const rotation = obstacle.body.angle;

      obstacle.graphics.position.set(x, y);
      // eslint-disable-next-line no-param-reassign
      obstacle.graphics.rotation = rotation;

      const translateX = x - obstacle.startPos.x;
      const translateY = y - obstacle.startPos.y;

      // eslint-disable-next-line no-param-reassign
      obstacle.element.style.transform = `translate(${translateX}px,${translateY}px) rotate(${rotation}rad)`;

      if (translateX !== 0 || translateY !== 0 || rotation !== 0) {
        // eslint-disable-next-line no-param-reassign
        obstacle.element.dataset.dirty = true;
      }
    });

    ball.graphics.position.set(ball.body.position.x, ball.body.position.y);

    rangefinder.graphics.clear();

    if (dragPosRef.current) {
      rangefinder.graphics.lineStyle(3, "#cccccc", 1);
      rangefinder.graphics.moveTo(ball.body.position.x, ball.body.position.y);
      rangefinder.graphics.lineTo(dragPosRef.current.x, dragPosRef.current.y);
    }
  });

  // Uncomment to debug physics bodies
  // await createMatterRenderer(engine, gameElement);

  // create runner
  const runner = Runner.create();

  Runner.run(runner, engine);

  let isGameDestroyed = false;
  const destroyGame = () => {
    if (isGameDestroyed) {
      return Promise.resolve();
    }

    // stop PIXI app
    app.destroy(true);
    // stop Matter runner
    Runner.stop(runner);
    // remove game div
    gameElement.remove();
    // remove spans?
    // remove translation on spans
    const obstacleElements = container.querySelectorAll(`.${spanClassName}`);

    const transitionPromises = [...obstacleElements].map((obstacle) => {
      return new Promise((resolve) => {
        if (!obstacle.dataset.dirty) {
          /* eslint-disable no-param-reassign */
          obstacle.style.transitionProperty = "";
          obstacle.style.transitionDuration = "";
          obstacle.style.transitionTimingFunction = "";
          obstacle.style.transform = "";
          /* eslint-enable no-param-reassign */
          resolve();

          return;
        }

        /* eslint-disable no-param-reassign */
        obstacle.style.transitionProperty = "transform";
        obstacle.style.transitionDuration = "1000ms";
        obstacle.style.transitionTimingFunction = "ease-in-out";
        obstacle.style.transform = "translate(0,0) rotate(0)";
        delete obstacle.dataset.dirty;

        obstacle.addEventListener("transitionend", () => {
          obstacle.style.transitionProperty = "";
          obstacle.style.transitionDuration = "";
          obstacle.style.transitionTimingFunction = "";
          obstacle.style.transform = "";
          resolve();
        });
        /* eslint-enable no-param-reassign */
      }).catch((error) => {
        console.error(error);
      });
    });

    isGameDestroyed = true;

    return Promise.all(transitionPromises);
  };

  return destroyGame;
};

export default gamifyElement;
