import attachGameView from "./attachGameView";
import createBall from "./createBall";
import createBounds from "./createBounds";
// createMatterRenderer is only used when we uncomment the
// the matter renderer debugger.
// eslint-disable-next-line no-unused-vars
import createMatterRenderer from "./createMatterRenderer";
import createObstacles from "./createObstacles";
import spanifyElementContents from "./spanifyElementContents";
import onMouseDown from "./onMouseDown";
import onMouseMove from "./onMouseMove";
import onMouseUp from "./onMouseUp";

const gamifyElement = async (containerElement) => {
  const Matter = await import("matter-js");
  const PIXI = await import("pixi.js");

  const { Engine, Body, Runner, Query } = Matter;

  const container = containerElement;

  const spanClassName = "obstacle";

  spanifyElementContents(container, spanClassName);

  container.style.position = "relative";
  container.style.zIndex = 1;

  const engine = Engine.create();

  engine.gravity.y = 0;

  const app = new PIXI.Application({
    backgroundAlpha: 0,
    height: container.offsetHeight,
    width: container.offsetWidth,
  });

  // gameElement is only used when we uncomment the
  // the matter renderer debugger.
  // eslint-disable-next-line no-unused-vars
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
      // eslint-disable-next-line no-param-reassign
      obstacle.element.style.transform = `translate(${
        x - obstacle.startPos.x
      }px,${y - obstacle.startPos.y}px) rotate(${rotation}rad)`;
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

  const destroyGame = () => {
    // stop PIXI app
    app.destroy();
    // stop Matter runner
    runner.stop();
    // destroy canvases
    // remove game divs
    // remove spans

    console.log({ app, runner });
  };

  return destroyGame;
};

export default gamifyElement;
